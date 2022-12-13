import { any } from 'prop-types';
import { string } from 'prop-types';
import { Interface } from 'readline';
import Employees from '../components/Employees';
import absences from './json_files/absences.json';
import members from './json_files/members.json';
export const getAbsenceTypes = () => {
  let types:string[]= [];
  const  addType  = (item : any): void => {
    let tp : string= item.type;
    if (!types.includes(tp)) {
      types.push(tp);
    }
  }
  absences.payload.forEach(addType);
  return types;
}
export const getAbsenceData = () : Employee[]   => {
  let text : Employee[] = [];
  members.payload.forEach(member);
  function member(item, index) {
    const absencesData = [...absences.payload.filter(x => x.userId == item.userId)];
    if (absencesData.length > 0) {
      absencesData.forEach(
        (itemAbsences) => {
          const obj : Employee =   {
            crewId: item.crewId,
            name: item.name,
            type: itemAbsences.type,
            period: getPeriod(itemAbsences.startDate, itemAbsences.endDate),
            memberNote: itemAbsences.memberNote,
            status: getStatus(itemAbsences.confirmedAt,itemAbsences.rejectedAt),
            admitterNote: itemAbsences.admitterNote,
            userId: item.userId,
            startDate: itemAbsences.startDate,
            endDate: itemAbsences.endDate
          };
          text.push(obj)
        }
      );
    }
  }
  //return undefined;
  // return [];
  return text;
};
interface Employee{
  crewId:String,
  name:String,
  type: String,
  period: number,
  memberNote: String, 
  status: String,
  admitterNote: String,
  userId:  String, 
  startDate:  String, 
  endDate:  String, 
}

const getPeriod = (startDate, endDate) => {
  var _startDate = new Date(startDate);
  var _endDate = new Date(endDate);
  let difference = _endDate.getTime()  - _startDate.getTime();
  let totalDays = Math.ceil(difference / (1000 * 3600 * 24))+1;
  return totalDays;
}

const getStatus = (confirmedAt,rejectedAt) => {
  //Requested', 'Confirmed' or 'Rejected')
  let status="";
  if(confirmedAt == null && rejectedAt == null){
    status ="Requested";
  }else  if(confirmedAt != null){
    status ="Confirmed";
  }else  if(rejectedAt != null){
    status ="Rejected";
  }
  return status;
}