Smogon-Usage-Stats
==================

Scripts for compiling usage stats from Smogon's Pokemon Showdown server

Note: requires [PyExecJS](https://pypi.python.org/pypi/PyExecJS)

Each month, Smogon's PS server logs millions of battles across dozens of metagames. These scripts read in those logs and distill them into usage statistics, from the simple counts used for tiering to detailed moveset and metagame statistics.


My Fork
==================

This is a forked version of Marty/Antar's Smogon-Usage-Stats optimized for side servers.

Code is rewritten in python3 and has QoL changes to the API to make it easier to use. Modified the ratings system to do proper ELO (Not weighted like smogon). Changed the output files to make more sense with less players (Glicko score means a lot less/unused). Updated to Gen9.

Tutorial
--------

1. This code assumes that you have a folder that both Smogon-Usage-Stats and pokemon-showdown are in.
This tutorial assumes Unix system, but is near equivalent for Windows.

2. [Optional] The files in the repository are up to date as of [6/24/23]. But can re-compile if either showdown change or you are using a modded dex.
```
node PS-Extractor.js
```

3. [Optional] Deletes all raw files. You may want to do this if you want to only get stats from a certain time period. Can specify a tier instead of "all" to only delete raw files from that tier.
```
python clean.py all
```

4. Your log files should be found in `../pokemon-showdown/logs/`. The /logs/ folder should be subdivided first by month, then by metagame, then by day. So Little Cup battles from June 3, 2013 will be found in: /logs/2013-06/lc/2013-06-03/

5.  To process PS logs for a given tier (say Little Cup) for a given day (say 2013-06-03):
```
$python batchLogReader.py ../pokemon-showdown/logs/2013-06/lc/2013-06-03/ lc
```

6.  To process for a month you can specify the higher level folder. This saves the raw data in `Raw/lc`.
This also saves the ratings in both a readable `ratings.txt` and machine `ratings.json` format. If you want to accumulate ratings over multiple runs, specify the json file as a parameter.
```
python batchLogReader.py ../pokemon-showdown/logs/2013-06/lc lc [ratings_file]
```

7. Run the StatCounter to get the usage stats in a human readable format for the raw file generated. Below saves the data in `Stats/lc-0.txt`. You can also specify a minimum rating, defaulting to 0.
```
python StatCounter.py lc
```


8. Once StatCounter.py has run its course, batchMovesetCounter.py may be run to generate detailed moveset statistics for any Pokemon that appears on at least than 0.01% of teams. This script depends on StatCounter.py having already been run (otherwise, there will be missing files). You can also specify a minimum rating, defaulting to 0, and a team type.
```
python batchMovesetCounter.py lc
```

There are additional scripts as well, but these are the only ones I used and edited. Other script's functions and usage should (hopefully) be documented in their respective files.


Sample Outputs
==================

Result of Usage stats from Gen4 8U from `Stats/gen48u-0.txt`:
```
 Total battles: 314
 + ---- + ------------------ + --------- + ------ + -------- + 
 | Rank | Pokemon            | Usage %   | Raw    | Win Rate | 
 + ---- + ------------------ + --------- + ------ + -------- + 
 | 1    | Sandshrew          |  49.2038% | 309    |  55.825% | 
 | 2    | Anorith            |  44.5860% | 280    |  50.893% | 
 | 3    | Volbeat            |  28.6624% | 180    |  56.389% | 
 | 4    | Croagunk           |  27.3885% | 172    |  54.942% | 
 | 5    | Sealeo             |  24.3631% | 153    |  58.497% | 
 | 6    | Meowth             |  22.4522% | 141    |  44.681% | 
 ```

Result of Player win rates stats from Gen4 8U from `Stats/ratings.txt`:
 ```
 + ---- + ------------------ + ---- + ------------ + ----- + ----- + -------- + 
 | Rank | Username           | ELO  | Glicko       | W     | L     | Win Rate |
 + ---- + ------------------ + ---- + ------------ + ----- + ----- + -------- + 
 | 1    | missanthropic      | 1181 | 1672 ±  92.4 | 46.0  | 19.0  |  70.769% |
 | 2    | cbninjask4uber     | 1174 | 1704 ±  89.9 | 20.0  | 6.0   |  76.923% |
 | 3    | EternumTagerMain   | 1152 | 1661 ±  92.0 | 35.0  | 20.0  |  63.636% |
 | 4    | Poyourt            | 1057 | 1565 ±  88.3 | 12.0  | 8.0   |  60.000% |
 ```

Result of movesets from Gen4 8U from `Stats/movesets/gen48u-0`:
```
 +----------------------------------------+ 
 | Sandshrew                              | 
 +----------------------------------------+ 
 | Raw count: 309                         | 
 | Viability Ceiling: 79                  | 
 +----------------------------------------+ 
 | Abilities                              | 
 | Sand Veil 100.000%                     | 
 +----------------------------------------+ 
 | Items                                  | 
 | Leftovers 93.204%                      | 
```