# viatick-code-test
code test submission repo for viatick

The steps to run each of the frontend and backend are provided in the README.md files of each repo.

Personal Feedback:
- this assignment was really interesting and it challenged me in ways I could not have anticipated.
- the GPS data extraction portion of the assignment took up most of the time and to be frank, it took up a whole day just
  trying to figure out why the hex dump from the sample MP4 video was not matching the specs given in the Novatek Documentation.
- fortunately it was resolved when a new sample video was sent that had the correct memory layout.
- subsequent tasks were simple enough until the parsing of the actual GPS data led me down another rabbit hole which consumed most
  of the second day. This time, eventhough the process of trying to parse the GPS data Packet Struct followed the specifications in Page 5 of the documentation,
  i was still unable to parse the GPS data accurately.
- i decided to not waste more time on the parsing task and carried on with the server-side and frontend development to meet the requirements
  specified in the testblank.
- overall, i believe the flow of the application from the moment of uploading to being able to view the map plots works, perhaps more time
  and analysis would be needed for parsing the GPS data and if there were more sample data and more in-depth documentation, the GPS data could be
  parsed more accurately
