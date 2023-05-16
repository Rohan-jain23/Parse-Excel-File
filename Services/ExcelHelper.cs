using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication16.Services
{
    public static class ExcelHelper
    {
        public static DataTable ExportData(Stream filePath, List<string> supportedFields)
        {
            var dtExcelData = new DataTable();
            using (var doc = SpreadsheetDocument.Open(filePath, false))
            {
                var sheet = doc.WorkbookPart.Workbook.Sheets.GetFirstChild<Sheet>();
                //Get the Worksheet instance.
                var worksheet = (doc.WorkbookPart.GetPartById(sheet.Id.Value) as WorksheetPart).Worksheet;

                //Fetch all the rows present in the Worksheet.
                var rows = worksheet.GetFirstChild<SheetData>().Descendants<Row>();
                var cellCount = 0;
                foreach (var cell in rows.FirstOrDefault().Elements<Cell>())
                {
                    cellCount += 1;
                    if (cellCount > supportedFields.Count)
                        break;
                }
                if (cellCount < supportedFields.Count)
                {
                    return null;
                }
                supportedFields.Where(r => r != null).ForEach(r =>
                {
                    dtExcelData.Columns.Add(r);
                });
                //Loop through the Worksheet rows.
                foreach (var row in rows)
                {
                    //Use the first row to add columns to DataTable.
                    if (row.RowIndex.Value > 1)
                    {
                        var cellValue = string.Empty;
                        DataRow dr = dtExcelData.NewRow();
                        for (int j = 0; j < row.Descendants<Cell>().Count(); j++)
                        {
                            Cell cell = row.Descendants<Cell>().ElementAt(j);
                            var value = GetValue(doc, cell);
                            if (String.IsNullOrEmpty(value))
                                continue;
                            int actualCellIndex = CellReferenceToIndex(cell);
                            dr[actualCellIndex] = value;
                        }

                        //Skip the blank rows
                        if (dr.ItemArray.All(i => String.IsNullOrEmpty(i.ToString())))
                            continue;
                        dtExcelData.Rows.Add(dr);
                    }
                }
            }
            return dtExcelData;
        }

        private static int CellReferenceToIndex(Cell cell)
        {
            int index = 0;
            string reference = cell.CellReference.ToString().ToUpper();
            foreach (char ch in reference)
            {
                if (Char.IsLetter(ch))
                {
                    int value = (int)ch - (int)'A';
                    index = (index == 0) ? value : ((index + 1) * 26) + value;
                }
                else
                    return index;
            }
            return index;
        }

        private static string GetValue(SpreadsheetDocument doc, Cell cell)
        {
            var value = cell.CellValue?.InnerText;
            if (string.IsNullOrWhiteSpace(value))
                return null;
            if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
            {
                return doc.WorkbookPart.SharedStringTablePart.SharedStringTable.ChildElements.GetItem(int.Parse(value)).InnerText;
            }
            return value.Trim();
        }

        private static void ForEach<T>(this IEnumerable<T> sequence, Action<T> action)
        {
            if (sequence != null)
            {
                foreach (T item in sequence) action(item);
            }
        }
    }
}
