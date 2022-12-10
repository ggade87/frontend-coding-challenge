import absences from './json_files/absences.json';
import members from './json_files/members.json';
export const getAbsenceTypes = () => {
  let types=[];
  absences.payload.forEach(addType);
  function addType(item) {
    if (!types.includes(item.type)) {
      types.push(item.type);
    }
  }
  return types;
}
export const getAbsenceData = () => {
  let text = [];
  members.payload.forEach(member);
  function member(item, index) {
    const absencesData = [...absences.payload.filter(x => x.userId == item.userId)];
    if (absencesData.length > 0) {
      absencesData.forEach(
        (itemAbsences) => {
          const obj = {
            crewId: item.crewId,
            name: item.name,
            type: itemAbsences.type,
            period: getPeriod(itemAbsences.startDate, itemAbsences.endDate),
            memberNote: itemAbsences.memberNote,
            status: getStatus(itemAbsences.confirmedAt,itemAbsences.rejectedAt),
            admitterNote: itemAbsences.admitterNote,
            userId: item.userId,
            memberNote: itemAbsences.memberNote,
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