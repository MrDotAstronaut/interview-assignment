# Loop -> QA Engineer | Interview Assignment
### Part 1 : Data Verification
- I iterated through all the pages and stored the data in a map.
- Later converted the map into a 2D array so I could iterate column wise and sum the values.
- The summed columns were formatted and converted back to string and compared.
Printed both summed and retrieved values for reference.

![alt text](<2024-02-18 (1).png>)
### Part 2 : Data Extraction and Validation
- I iterated through all the pages and stored the data in a map.
- Later realized merged cells are present so added logic to concat the values when missing.
- Stored the map into CSV in reverse to order it by 'Order ID'
- Downloaded the csv for comparison and realized columns headers and values don't match.
- Compared based on indexing
- Modified formatting for columns where required.
- After all the prior steps noticed, 'transaction_type' follows different order and cannot be matched using my approach.
- Not sure if that is possible as this will require maintaining relative records while sorting.
- Since I don't have more time to spend on the assignment, leaving the failed comparisons as is.

![alt text](<2024-02-18 (2).png>)
### Assignment CSVs and Recordings
![alt text](<2024-02-18 (3).png>)