import { formatNumber } from '@angular/common';
import { CDataTableData, CDataTableFunctionParams } from '../../../../../../src/types/index';

const users: CDataTableData[] = [
  {
    city: {
      value: 'Petaling Jaya',
    },
    email: {
      value: 'ywhitehorn0@google.ca',
      children: [
        {
          value: 'Send email',
          component: {
            tag: 'c-button',
            params: {
              ghost: true,
              size: 'small',
              onClick: (options: CDataTableFunctionParams) =>
                console.log('Sending email to', options.value),
            },
          },
        },
      ],
    },
    firstName: {
      value: 'Yovonnda',
    },
    id: {
      value: 1,
    },
    lastName: {
      value: 'Whitehorn',
    },
  },
  {
    city: {
      value: 'Sitovo',
    },
    email: {
      value: 'gmccrillis1@state.gov',
    },
    firstName: {
      value: 'Gerry',
    },
    id: {
      value: 2,
    },
    lastName: {
      value: 'McCrillis',
    },
  },
  {
    city: {
      value: 'Krasne',
    },
    email: {
      value: 'sdoxey2@abc.net.au',
    },
    firstName: {
      value: 'Sarajane',
    },
    id: {
      value: 3,
    },
    lastName: {
      value: 'Doxey',
    },
  },
  {
    city: {
      value: 'Haukivuori',
    },
    email: {
      value: 'eguiot3@imdb.com',
    },
    firstName: {
      value: 'Elle',
    },
    id: {
      value: 4,
    },
    lastName: {
      value: 'Guiot',
    },
  },
  {
    city: {
      value: 'Little Current',
    },
    email: {
      value: 'pbotley4@nih.gov',
    },
    firstName: {
      value: 'Patten',
    },
    id: {
      value: 5,
    },
    lastName: {
      value: 'Botley',
    },
  },
  {
    city: {
      value: 'Kulase',
    },
    email: {
      value: 'mpenswick5@webeden.co.uk',
    },
    firstName: {
      value: 'Marleah',
    },
    id: {
      value: 6,
    },
    lastName: {
      value: 'Penswick',
    },
  },
  {
    city: {
      value: 'Hikkaduwa',
    },
    email: {
      value: 'ptriner6@upenn.edu',
    },
    firstName: {
      value: 'Pat',
    },
    id: {
      value: 7,
    },
    lastName: {
      value: 'Triner',
    },
  },
  {
    city: {
      value: 'Suka Makmue',
    },
    email: {
      value: 'mantoniou7@illinois.edu',
    },
    firstName: {
      value: 'Martynne',
    },
    id: {
      value: 8,
    },
    lastName: {
      value: 'Antoniou',
    },
  },
  {
    city: {
      value: 'Perreng',
    },
    email: {
      value: 'jmudie8@google.ca',
    },
    firstName: {
      value: 'Jamal',
    },
    id: {
      value: 9,
    },
    lastName: {
      value: 'Mudie',
    },
  },
  {
    city: {
      value: 'Shiree',
    },
    email: {
      value: 'echildren9@icq.com',
    },
    firstName: {
      value: 'Elvera',
    },
    id: {
      value: 10,
    },
    lastName: {
      value: 'Children',
    },
  },
  {
    city: {
      value: 'Sandnes',
    },
    email: {
      value: 'lmitchinsona@reference.com',
    },
    firstName: {
      value: 'Ladonna',
    },
    id: {
      value: 11,
    },
    lastName: {
      value: 'Mitchinson',
    },
  },
  {
    city: {
      value: 'Kaberamaido',
    },
    email: {
      value: 'jtiffinb@miitbeian.gov.cn',
    },
    firstName: {
      value: 'Jehanna',
    },
    id: {
      value: 12,
    },
    lastName: {
      value: 'Tiffin',
    },
  },
  {
    city: {
      value: 'General Vedia',
    },
    email: {
      value: 'nborthramc@geocities.jp',
    },
    firstName: {
      value: 'Norby',
    },
    id: {
      value: 13,
    },
    lastName: {
      value: 'Borthram',
    },
  },
  {
    city: {
      value: 'Padaran',
    },
    email: {
      value: 'kstringfellowd@google.fr',
    },
    firstName: {
      value: 'Kimberlee',
    },
    id: {
      value: 14,
    },
    lastName: {
      value: 'Stringfellow',
    },
  },
  {
    city: {
      value: 'Helsingborg',
    },
    email: {
      value: 'gbanasike@ycombinator.com',
    },
    firstName: {
      value: 'Gordie',
    },
    id: {
      value: 15,
    },
    lastName: {
      value: 'Banasik',
    },
  },
  {
    city: {
      value: 'Ntungamo',
    },
    email: {
      value: 'amcmainsf@rambler.ru',
    },
    firstName: {
      value: 'Aurel',
    },
    id: {
      value: 16,
    },
    lastName: {
      value: 'McMains',
    },
  },
  {
    city: {
      value: 'Kambing',
    },
    email: {
      value: 'ckleinmanng@de.vu',
    },
    firstName: {
      value: 'Cristen',
    },
    id: {
      value: 17,
    },
    lastName: {
      value: 'Kleinmann',
    },
  },
  {
    city: {
      value: 'Jequié',
    },
    email: {
      value: 'tpluesh@myspace.com',
    },
    firstName: {
      value: 'Thibaud',
    },
    id: {
      value: 18,
    },
    lastName: {
      value: 'Plues',
    },
  },
  {
    city: {
      value: 'Pirca',
    },
    email: {
      value: 'coliphardi@webnode.com',
    },
    firstName: {
      value: 'Carver',
    },
    id: {
      value: 19,
    },
    lastName: {
      value: 'Oliphard',
    },
  },
  {
    city: {
      value: 'Sanfang',
    },
    email: {
      value: 'sorrisj@homestead.com',
    },
    firstName: {
      value: 'Shurlocke',
    },
    id: {
      value: 20,
    },
    lastName: {
      value: 'Orris',
    },
  },
  {
    city: {
      value: 'Daphu',
    },
    email: {
      value: 'bbethunek@51.la',
    },
    firstName: {
      value: 'Bryan',
    },
    id: {
      value: 21,
    },
    lastName: {
      value: 'Bethune',
    },
  },
  {
    city: {
      value: 'Haykashen',
    },
    email: {
      value: 'cyonniel@sun.com',
    },
    firstName: {
      value: 'Carleton',
    },
    id: {
      value: 22,
    },
    lastName: {
      value: 'Yonnie',
    },
  },
  {
    city: {
      value: 'Qigzhi',
    },
    email: {
      value: 'seasumm@aboutads.info',
    },
    firstName: {
      value: 'Sibilla',
    },
    id: {
      value: 23,
    },
    lastName: {
      value: 'Easum',
    },
  },
  {
    city: {
      value: 'Mossel Bay',
    },
    email: {
      value: 'dclaesensn@fc2.com',
    },
    firstName: {
      value: 'Dosi',
    },
    id: {
      value: 24,
    },
    lastName: {
      value: 'Claesens',
    },
  },
  {
    city: {
      value: 'Mežica',
    },
    email: {
      value: 'depinoyo@oracle.com',
    },
    firstName: {
      value: 'Daron',
    },
    id: {
      value: 25,
    },
    lastName: {
      value: 'Epinoy',
    },
  },
  {
    city: {
      value: 'Kraaifontein',
    },
    email: {
      value: 'vfilippuccip@alexa.com',
    },
    firstName: {
      value: 'Vanya',
    },
    id: {
      value: 26,
    },
    lastName: {
      value: 'Filippucci',
    },
  },
  {
    city: {
      value: 'Lipník nad Bečvou',
    },
    email: {
      value: 'cjanuq@arstechnica.com',
    },
    firstName: {
      value: 'Caroline',
    },
    id: {
      value: 27,
    },
    lastName: {
      value: 'Janu',
    },
  },
  {
    city: {
      value: 'Al Khāniq',
    },
    email: {
      value: 'mchantillonr@yale.edu',
    },
    firstName: {
      value: 'Meyer',
    },
    id: {
      value: 28,
    },
    lastName: {
      value: 'Chantillon',
    },
  },
  {
    city: {
      value: 'Cikarang',
    },
    email: {
      value: 'ibens@blogspot.com',
    },
    firstName: {
      value: 'Iorgos',
    },
    id: {
      value: 29,
    },
    lastName: {
      value: 'Ben',
    },
  },
  {
    city: {
      value: 'Mrganush',
    },
    email: {
      value: 'sfulbrookt@google.com.br',
    },
    firstName: {
      value: 'Stella',
    },
    id: {
      value: 30,
    },
    lastName: {
      value: 'Fulbrook',
    },
  },
  {
    city: {
      value: 'Borjomi',
    },
    email: {
      value: 'apepperellu@dmoz.org',
    },
    firstName: {
      value: 'Adamo',
    },
    id: {
      value: 31,
    },
    lastName: {
      value: 'Pepperell',
    },
  },
  {
    city: {
      value: 'Dapuchaihe',
    },
    email: {
      value: 'ebencev@wikipedia.org',
    },
    firstName: {
      value: 'Esme',
    },
    id: {
      value: 32,
    },
    lastName: {
      value: 'Bence',
    },
  },
  {
    city: {
      value: 'Lotoshino',
    },
    email: {
      value: 'vseearw@jimdo.com',
    },
    firstName: {
      value: 'Viv',
    },
    id: {
      value: 33,
    },
    lastName: {
      value: 'Seear',
    },
  },
  {
    city: {
      value: 'Yingchuan',
    },
    email: {
      value: 'hmarchellix@upenn.edu',
    },
    firstName: {
      value: 'Hester',
    },
    id: {
      value: 34,
    },
    lastName: {
      value: 'Marchelli',
    },
  },
  {
    city: {
      value: 'Piraí do Sul',
    },
    email: {
      value: 'flaurischy@netlog.com',
    },
    firstName: {
      value: 'Francisco',
    },
    id: {
      value: 35,
    },
    lastName: {
      value: 'Laurisch',
    },
  },
  {
    city: {
      value: 'Randu',
    },
    email: {
      value: 'nranscombez@vinaora.com',
    },
    firstName: {
      value: 'Nikos',
    },
    id: {
      value: 36,
    },
    lastName: {
      value: 'Ranscombe',
    },
  },
  {
    city: {
      value: 'Vamvakoú',
    },
    email: {
      value: 'smarquet10@tmall.com',
    },
    firstName: {
      value: 'Sherlocke',
    },
    id: {
      value: 37,
    },
    lastName: {
      value: 'Marquet',
    },
  },
  {
    city: {
      value: 'Arzila',
    },
    email: {
      value: 'ddallinder11@nps.gov',
    },
    firstName: {
      value: 'Dario',
    },
    id: {
      value: 38,
    },
    lastName: {
      value: 'Dallinder',
    },
  },
  {
    city: {
      value: 'Lagoaça',
    },
    email: {
      value: 'cranfield12@technorati.com',
    },
    firstName: {
      value: 'Cliff',
    },
    id: {
      value: 39,
    },
    lastName: {
      value: 'Ranfield',
    },
  },
  {
    city: {
      value: 'Ramada',
    },
    email: {
      value: 'lrammell13@ycombinator.com',
    },
    firstName: {
      value: 'Lina',
    },
    id: {
      value: 40,
    },
    lastName: {
      value: 'Rammell',
    },
  },
  {
    city: {
      value: 'Horred',
    },
    email: {
      value: 'dfarnish14@ehow.com',
    },
    firstName: {
      value: 'Dennison',
    },
    id: {
      value: 41,
    },
    lastName: {
      value: 'Farnish',
    },
  },
  {
    city: {
      value: 'Barurao',
    },
    email: {
      value: 'atwinbourne15@google.com.au',
    },
    firstName: {
      value: 'Alard',
    },
    id: {
      value: 42,
    },
    lastName: {
      value: 'Twinbourne',
    },
  },
  {
    city: {
      value: 'Zhouxi',
    },
    email: {
      value: 'cgitting16@salon.com',
    },
    firstName: {
      value: 'Cary',
    },
    id: {
      value: 43,
    },
    lastName: {
      value: 'Gitting',
    },
  },
  {
    city: {
      value: 'Stare Kurowo',
    },
    email: {
      value: 'dgillinghams17@gnu.org',
    },
    firstName: {
      value: 'Darla',
    },
    id: {
      value: 44,
    },
    lastName: {
      value: 'Gillinghams',
    },
  },
  {
    city: {
      value: 'Shuinan',
    },
    email: {
      value: 'bblampey18@nydailynews.com',
    },
    firstName: {
      value: 'Basil',
    },
    id: {
      value: 45,
    },
    lastName: {
      value: 'Blampey',
    },
  },
  {
    city: {
      value: 'Sonsón',
    },
    email: {
      value: 'cdowda19@canalblog.com',
    },
    firstName: {
      value: 'Chan',
    },
    id: {
      value: 46,
    },
    lastName: {
      value: 'Dowda',
    },
  },
  {
    city: {
      value: 'Aemura',
    },
    email: {
      value: 'cshower1a@webnode.com',
    },
    firstName: {
      value: 'Cherlyn',
    },
    id: {
      value: 47,
    },
    lastName: {
      value: 'Shower',
    },
  },
  {
    city: {
      value: 'Nanling',
    },
    email: {
      value: 'hflower1b@ucoz.ru',
    },
    firstName: {
      value: 'Harold',
    },
    id: {
      value: 48,
    },
    lastName: {
      value: 'Flower',
    },
  },
  {
    city: {
      value: 'Cincinnati',
    },
    email: {
      value: 'zduesbury1c@blog.com',
    },
    firstName: {
      value: 'Zonda',
    },
    id: {
      value: 49,
    },
    lastName: {
      value: 'Duesbury',
    },
  },
  {
    city: {
      value: 'Kostinbrod',
    },
    email: {
      value: 'cdiplock1d@clickbank.net',
    },
    firstName: {
      value: 'Chance',
    },
    id: {
      value: 50,
    },
    lastName: {
      value: 'Diplock',
    },
  },
];

const getProgressFromValue = (value: string) => Math.min(value.length * 10, 100);

users.forEach((user) => {
  user['progress'] = {
    value: getProgressFromValue(user['firstName'].value as string),
  };

  user['progress2'] = {
    value: getProgressFromValue(user['lastName'].value as string),
  };

  const failure = getProgressFromValue(user['firstName'].value as string) / 3;

  user['failure'] = {
    value: failure,
    formattedValue: `${formatNumber(failure, 'en-US', '1.0')} %`,
  };

  const salary = getProgressFromValue(user['firstName'].value as string) * 64;

  user['salary'] = {
    value: salary,
    formattedValue: `${formatNumber(salary, 'en-US', '1.0')} $`,
  };
});

export default users;
