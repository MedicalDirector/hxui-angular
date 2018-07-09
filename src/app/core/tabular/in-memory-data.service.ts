import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Context} from '../../../../projects/hx-ui/src/lib/enums';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        usercode: 'BR001',
        firstname: 'Brenda',
        surname: 'Reed',
        rolename: 'GP',
        email: 'brenda.reed@medicaldirector.com',
        active: false,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.Danger
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        cssClass: 'is-text-line-through'
      },
      {
        id: 2,
        usercode: 'MR001',
        firstname: 'Mercedes',
        surname: 'Mendez',
        rolename: 'GP',
        email: 'mercedes.mendez@medicaldirector.com',
        active: false,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.Warning
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        checked: true,
        flag: {label: 'S', cssClass: ''}
      },
      {
        id: 3,
        usercode: 'II006',
        firstname: 'John',
        surname: 'Smith',
        rolename: 'Specialist',
        email: 'john.smith@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.Danger
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {
          label: 'S',
          cssClass: 'is-outlined'
        },
        selected: true
      },
      {
        id: 4,
        usercode: 'JS001',
        firstname: 'Julia',
        surname: 'Sampson',
        rolename: 'Specialist',
        email: 'julia.sampson@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {
          label: 'S',
          cssClass: 'is-danger'
        },
        stripeContext: Context.Danger
      },
      {
        id: 5,
        usercode: 'GP001',
        firstname: 'John',
        surname: 'Pipps',
        rolename: 'Specialist',
        email: 'john.gipps@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-warning'},
        context: Context.Warning,
        stripeContext: Context.Warning
      },
      {
        id: 6,
        usercode: 'NR001',
        firstname: 'Natalie',
        surname: 'Roberts',
        rolename: 'Receptionist',
        email: 'natalie.roberts@medicaldirector.com',
        active: false,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'bottom',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: ''}
      },
      {
        id: 7,
        usercode: 'HS001',
        firstname: 'Harry',
        surname: 'Sechi',
        rolename: 'GP',
        email: 'harry.sechi@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-error'}
      },
      {
        id: 8,
        usercode: 'XL001',
        firstname: 'Xavier',
        surname: 'Lorenzo',
        rolename: 'Practice Manager',
        email: 'xavier.lorenzo@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-outlined'}
      },
      {
        id: 9,
        usercode: 'CY001',
        firstname: 'Chris',
        surname: 'Yap',
        rolename: 'GP',
        email: 'chris.yap@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: ''},
        context: Context.Danger
      },
      {
        id: 10,
        usercode: 'MA001',
        firstname: 'Mohammad',
        surname: 'Ahmed',
        rolename: 'Specialist',
        email: 'mohammad.ahmed@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'Short', cssClass: ''}
      },
      {
        id: 11,
        usercode: 'EG001',
        firstname: 'Elizabth',
        surname: 'Gino',
        rolename: 'Nurse',
        email: 'eli.gino@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-outlined'}
      },
      {
        id: 12,
        usercode: 'BP001',
        firstname: 'Brian',
        surname: 'Pulliese',
        rolename: 'Specialist',
        email: 'brian.pulliese@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-primary'}
      },
      {
        id: 13,
        usercode: 'AW001',
        firstname: 'Annabell',
        surname: 'Wilson',
        rolename: 'Receptionist',
        email: 'annabell.wilson@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-primary'}
      },
      {
        id: 13,
        usercode: 'BW001',
        firstname: 'Annabell',
        surname: 'Bolsen',
        rolename: 'Receptionist',
        email: 'annabell.wilson@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-primary'}
      },
      {
        id: 14,
        usercode: 'SH001',
        firstname: 'Susan',
        surname: 'Homes',
        rolename: 'Receptionist',
        email: 'susan.homes@medicaldirector.com',
        active: false,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: ' is-outlined'}
      },
      {
        id: 15,
        usercode: 'KL001',
        firstname: 'Kevin',
        surname: 'Liang',
        rolename: 'GP',
        email: 'kevin.liang@medicaldirector.com',
        active: false,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        context: Context.Warning
      },
      {
        id: 16,
        usercode: 'JK001',
        firstname: 'Jack',
        surname: 'Kelvin',
        rolename: 'Nurse',
        email: 'jack.kelvin@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date()
      },
      {
        id: 17,
        usercode: 'DP001',
        firstname: 'Dave',
        surname: 'Poon',
        rolename: 'Practice Manager',
        email: 'dave.poon@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date()
      },
      {
        id: 18,
        usercode: 'FB001',
        firstname: 'Fred',
        surname: 'Borris',
        rolename: 'Admin',
        email: 'fred.borris@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date(),
        flag: {label: 'S', cssClass: 'is-outlined'}
      },
      {
        id: 19,
        usercode: 'TS001',
        firstname: 'Tupac',
        surname: 'Shakur',
        rolename: 'Administrator',
        email: 'tupac.shakur@medicaldirector.com',
        active: true,
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        created: new Date(),
        modified: new Date()
      },
      {
        id: 20,
        usercode: 'BS001',
        firstname: 'Biggie',
        surname: 'Smalls',
        rolename: 'GP',
        info: {
          icon: 'icon-information-outline',
          tooltip: {
            config: {
              placement: 'right',
              context: Context.None
            },
            content: 'Information'
          }
        },
        email: 'biggie.smalls@medicaldirector.com',
        active: true,
        created: new Date(),
        modified: new Date()
      }
    ];
    return {users};
  }
}
