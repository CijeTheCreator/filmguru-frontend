BULK INSERT SchoolsTemp
    FROM 'C:\CSVData\Schools.csv'
    WITH
    (
    FIRSTROW = 2,
    FIELDTERMINATOR = ',',  --CSV field delimiter
    ROWTERMINATOR = '\n',   --Use to shift the control to next row
    ERRORFILE = 'C:\CSVDATA\SchoolsErrorRows.csv',
    TABLOCK
    )
