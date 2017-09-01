import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id:1,
        usercode: 'BR001',
        firstname: 'Brenda',
        surname: 'Reed',
        rolename: 'GP',
        email: 'brenda.reed@medicaldirector.com',
        active: false
      },
      {
        id: 2,
        usercode: 'MR001',
        firstname: 'Mercedes',
        surname: 'Mendez',
        rolename: 'GP',
        email: 'mercedes.mendez@medicaldirector.com',
        active: false
      },
      {
        id:3,
        usercode: 'II006',
        firstname: 'John',
        surname: 'Smith',
        rolename: 'Specialist',
        email: 'john.smith@medicaldirector.com',
        active: true
      },
      {
        id:4,
        usercode: 'JS001',
        firstname: 'Julia',
        surname: 'Sampson',
        rolename: 'Specialist',
        email: 'julia.sampson@medicaldirector.com',
        active: true
      },
      {
        id:5,
        usercode: 'GP001',
        firstname: 'John',
        surname: 'Pipps',
        rolename: 'Specialist',
        email: 'john.gipps@medicaldirector.com',
        active: true
      },
      {
        id:6,
        usercode: 'NR001',
        firstname: 'Natalie',
        surname: 'Roberts',
        rolename: 'Receptionist',
        email: 'natalie.roberts@medicaldirector.com',
        active: false
      },
      {
        id:7,
        usercode: 'HS001',
        firstname: 'Harry',
        surname: 'Sechi',
        rolename: 'GP',
        email: 'harry.sechi@medicaldirector.com',
        active: true
      },
      {
        id:8,
        usercode: 'XL001',
        firstname: 'Xavier',
        surname: 'Lorenzo',
        rolename: 'Practice Manager',
        email: 'xavier.lorenzo@medicaldirector.com',
        active: true
      },
      {
        id:9,
        usercode: 'CY001',
        firstname: 'Chris',
        surname: 'Yap',
        rolename: 'GP',
        email: 'chris.yap@medicaldirector.com',
        active: true
      },
      {
        id: 10,
        usercode: 'MA001',
        firstname: 'Mohammad',
        surname: 'Ahmed',
        rolename: 'Specialist',
        email: 'mohammad.ahmed@medicaldirector.com',
        active: true
      },
      {
        id: 11,
        usercode: 'EG001',
        firstname: 'Elizabth',
        surname: 'Gino',
        rolename: 'Nurse',
        email: 'eli.gino@medicaldirector.com',
        active: true
      },
      {
        id: 12,
        usercode: 'BP001',
        firstname: 'Brian',
        surname: 'Pulliese',
        rolename: 'Specialist',
        email: 'brian.pulliese@medicaldirector.com',
        active: true
      },
      {
        id: 13,
        usercode: 'AW001',
        firstname: 'Annabell',
        surname: 'Wilson',
        rolename: 'Receptionist',
        email: 'annabell.wilson@medicaldirector.com',
        active: true
      },
      {
        id:14,
        usercode: 'SH001',
        firstname: 'Susan',
        surname: 'Homes',
        rolename:'Receptionist',
        email: 'susan.homes@medicaldirector.com',
        active: false
      },
      {
        id:15,
        usercode: 'KL001',
        firstname: 'Kevin',
        surname: 'Liang',
        rolename:'GP',
        email: 'kevin.liang@medicaldirector.com',
        active: false
      },
      {
        id:16,
        usercode: 'JK001',
        firstname: 'Jack',
        surname: 'Kelvin',
        rolename:'Nurse',
        email: 'jack.kelvin@medicaldirector.com',
        active: true
      },
      {
        id:17,
        usercode: 'DP001',
        firstname: 'Dave',
        surname: 'Poon',
        rolename: 'Practice Manager',
        email: 'dave.poon@medicaldirector.com',
        active: true
      },
      {
        id:18,
        usercode: 'FB001',
        firstname: 'Fred',
        surname: 'Borris',
        rolename: 'Admin',
        email: 'fred.borris@medicaldirector.com',
        active: true
      },
      {
        id:19,
        usercode: 'TS001',
        firstname: 'Tupac',
        surname: 'Shakur',
        rolename:'Administrator',
        email: 'tupac.shakur@medicaldirector.com',
        active: true
      },
      {
        id:20,
        usercode: 'BS001',
        firstname: 'Biggie',
        surname: 'Smalls',
        rolename:'GP',
        email: 'biggie.smalls@medicaldirector.com',
        active: true
      }
    ];
    return {users};
  }
}
