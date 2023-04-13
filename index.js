db.createCollection("topics"); //done
db.createCollection("task"); //done
db.createCollection("company_drives");
db.createCollection("users"); //done
db.createCollection("mentors"); //done
db.createCollection("attendance");

db.users.insertMany([
  { userid: 1, name: "Iliyas", email: "iliyas123@gmail.com" },
  { userid: 2, name: "Mohamed ", email: "mohamed123@gmail.com" },
  { userid: 3, name: "Gokul", email: "gokul123@gmail.com" },
  { userid: 4, name: "kathri", email: "kathir123@gmail.com" },
]);

db.mentors.insertMany([
  { mentorid: 1, name: "Sanjay", email: "SanjayMentor@gmail.com", mentees: 40 },
  { mentorid: 2, name: "Vidtya", email: "vidtyaMentor@gmail.com", mentees: 34 },
  { mentorid: 3, name: "Rupan", email: "RupanMentor@gmail.com", mentees: 52 },
]);

db.topics.insertMany([
  { topics: "Html", monthofTeaching: "July" },
  { topics: "Css", monthofTeaching: "August" },
  { topics: "JS", monthofTeaching: "september" },
  { topics: "React", monthofTeaching: "october" },
  { topics: "SQL", monthofTeaching: "october" },
  { topics: "MongoDB", monthofTeaching: "November" },
  { topics: "Nodejs", monthofTeaching: "December" },
]);

db.task.insertMany([
  { task: "Html", monthofTeaching: "August" },
  { task: "Css", monthofTeaching: "september" },
  { task: "JS", monthofTeaching: "october" },
  { task: "React", monthofTeaching: "october" },
  { task: "SQL", monthofTeaching: "November" },
  { task: "MongoDB", monthofTeaching: "December" },
  { task: "Nodejs", monthofTeaching: "January" },
]);

db.company_drives.insertMany([
  { company: "TCS", date: ISODate("2023-10-19"),attendor:1 }, // used ISOdate to use aggregates $gt $lt
  { company: "Swiggy", date: ISODate("2023-10-17"),attendor:3 },// atttendor refers userid
  { company: "Roadster", date: ISODate("2023-10-23"),attendor:4 },
  { company: "EA", date: ISODate("2023-10-30"),attendor:1 },
  { company: "CupsCoaster", date: ISODate("2023-10-20"),attendor:2 },
]);

//Quesion-1
//Find all the topics and tasks which are thought in the month of October

db.topics.find({ month: October });
db.tasks.find({ month: October });

//2
//Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.company_drives.find({date:{$gte:ISODate("2023-10-15"),$lte:ISODate("2023-10-30")}}) //$gte --> gt or equal  and lte --> lt or equal 

//3
//Find all the company drives and students who are appeared for the placement

db.users.aggregate([{
    $lookup:{
        from:"company_drives",
        localfield:"userid",
        foreignfield:"attendor",
        as:"attendor"
    }
}])

//4.Find all the mentors with mentee's count more than 15
db.mentors.find({mentees:{$gte:15}})