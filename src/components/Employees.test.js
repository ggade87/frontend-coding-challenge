import Employees from './Employees';
import Enzyme , { shallow, configure, render , mount} from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

test('should render loading', () => {
    const prop = {employees:[], loading:true }
    let wrapper = mount(<Employees {...prop} />);
    const h2 = wrapper.find('h2');
    expect(h2).toHaveLength(1);
    expect(h2.text()).toEqual("Loading...");
});


test('should render table', () => {
    const prop = {employees:[], loading:false }
    let wrapper = mount(<Employees {...prop} />);
    expect(wrapper.children('table')).toHaveLength(0);
});

test('should render one employee', () => {
    const prop = {employees:[{ 
        crewId:"a",  
        name:"Ganesh", 
        type:"tt", 
        period: 1, 
        memberNote:"asa", 
        status: "asas",
        admitterNote: "sas",
        userId: "3434", 
        startDate: "445", 
        endDate:  "" }], loading:false }
        let wrapper = mount(<Employees {...prop} />);
        const table = wrapper.find('table');
        expect(table).toHaveLength(1);

        const tbody = table.find('tbody');
        expect(tbody).toHaveLength(1);
        // tbody tag should have the same number of tr tags as data rows
        const rows = tbody.find('tr');
        expect(rows).toHaveLength(1);
        /*   Loop through each row and check the content*/
        rows.forEach((tr, rowIndex) => {
           const cells = tr.find('td');
           expect(cells).toHaveLength(7);
           expect(cells.at(0).text().trim()).toEqual(prop.employees[rowIndex].userId);
           expect(cells.at(1).text().trim()).toEqual(prop.employees[rowIndex].name);
        });
});

test('should not render employee', () => {
    const prop = {employees:[], loading:false }
        let wrapper = mount(<Employees {...prop} />);
        const table = wrapper.find('table');
        expect(table).toHaveLength(1);
        const tbody = table.find('tbody');
        expect(tbody).toHaveLength(1);
        const rows = tbody.find('tr');
        expect(rows).toHaveLength(0);
});

test('should render table header', () => {
    const prop = {employees:[], loading:false }
    let wrapper = mount(<Employees {...prop} />);
    const thead = wrapper.find('thead');
    expect(thead).toHaveLength(1);
    // tbody tag should have the same number of tr tags as data rows
    const rows = thead.find('tr');
    const cells = rows.find('th');
    expect(cells.at(0).text().trim()).toEqual("ID");
    expect(cells.at(1).text().trim()).toEqual("Member name");
    expect(cells.at(2).text().trim()).toEqual("Type of absence");
    expect(cells.at(3).text().trim()).toEqual("Period");
    expect(cells.at(4).text().trim()).toEqual("Member note");
    expect(cells.at(5).text().trim()).toEqual("Status");
    expect(cells.at(6).text().trim()).toEqual("Admitter note");
});