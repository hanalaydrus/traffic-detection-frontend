

export const data = [
    {
            'id': 1,
            'city': 'bandung',
            'student':[
                {
                    'fullname':"jhonantan",
                    'email':'jhonwick@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bandung",
                    "batch":'nightwalker',
                    "status":"lulus"
                },
                {
                    'fullname':"frans",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bandung",
                    "batch":'nightwalker',
                    "status":"lulus"
                },
                {
                    'fullname':"bill",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bandung",
                    "batch":'daenrys',
                    "status":"gagal"
                }
            ],
            'batches': ['nightwalker','daenrys'] 
        },
        {
            'id': 2,
            'city': 'yogya',
            'student':[
                {
                    'fullname':"wicki",
                    'email':'jhonwick@hadouken.com',
                    'phone':'09322020',
                    "campuses":"yogya",
                    "batch":'dark_night',
                    "status":"lulus"
                },
                {
                    'fullname':"lovee",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"yogya",
                    "batch":'dark_soul',
                    "status":"lulus"
                },
                {
                    'fullname':"mamamia",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"yogya",
                    "batch":'dark_night',
                    "status":"gagal"
                },
                {
                    'fullname':"mamamia2",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"yogya",
                    "batch":'dark_night',
                    "status":"gagal"
                }
            ],
            'batches': ['dark_night','dark_soul'] 
        },
         {
            'id': 3,
            'city': 'kalimantan',
            'student':[
                {
                    'fullname':"beer",
                    'email':'jhonwick@hadouken.com',
                    'phone':'09322020',
                    "campuses":"kalimantan",
                    "batch":'jhonny_walker',
                    "status":"lulus"
                },
                {
                    'fullname':"brand",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"kalimantan",
                    "batch":'babayaga',
                    "status":"menunggu dokumen"
                },
                {
                    'fullname':"bratt",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"kalimantan",
                    "batch":'jhonwick',
                    "status":"gagal"
                }
            ],
            'batches': ['jhonny_walker','babayaga','jhonwick'] 
            
        },
         {
            'id': 4,
            'city': 'bali',
            'student':[
                {
                    'fullname':"bordin",
                    'email':'jhonwick@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bali",
                    "batch":'ameriki',
                    "status":"lulus"
                },
                {
                    'fullname':"border",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bali",
                    "batch":'auora',
                    "status":"gagal"
                },
                {
                    'fullname':"bill",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bali",
                    "batch":'alpacino',
                    "status":"pending"
                }
            ],
            'batches':['alpacino','auora','ameriki'] 
         },
        {
            'id': 5,
            'city': 'solo',
            'student':[
                {
                    'fullname':"jhonantan adaw",
                    'email':'jhonwick@hadouken.com',
                    'phone':'09322020',
                    "campuses":"solo",
                    "batch":'forestgump',
                    "status":"lulus"
                },
                {
                    'fullname':"frans gagal",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"solo",
                    "batch":'forestgump',
                    "status":"lulus"
                },
                {
                    'fullname':"bill jean",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"solo",
                    "batch":'forestgump',
                    "status":"gagal"
                }
            ],
            'batches':['forestgump'] 
        } ,
        {
            'id': 6,
            'city': 'depok',
            'student':[
                {
                    'fullname':"jhonantanmiawww",
                    'email':'jhonwick@hadouken.com',
                    'phone':'09322020',
                    "campuses":"depok",
                    "batch":'metalica',
                    "status":"preparation"
                },
                {
                    'fullname':"fransaaslidepok",
                    'email':'franssinataslidepokra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"depok",
                    "batch":'metalica',
                    "status":"lulus"
                },
                {
                    'fullname':"bill depok",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"depok",
                    "batch":'metalica',
                    "status":"lulus"
                }
            ],
            'batches':['metalica'] 
        
        }
    ]
        
function getStudent(data){
    return data.reduce((acc,curr) => acc.concat(curr.student),[])
}

function getCampus(data){
    return data.reduce((acc,curr) => {
        delete curr['student']
        return acc.concat(Object.assign({},curr))
    },[])
}

// function filteringData(data){
//     return (action) => data.filter((data) => data[action.filter]===action.task)
// }

// function getFilterByOrder(data){
//     return (action) => {
//         if(action.length === 1){
//             return data.filter((data,index) => data[action[0].filter]===action.status)
//         }else if(action.length === 2){
//              return data.filter((data,index) => {
//                  return (data[action[0].filter]===action.status && data[action[1].filter]===action.status)})
//         }else if(action.length === 3){
//             return (
//                 data[action[0].filter]===action.status && 
//                 data[action[1].filter]===action.status && 
//                 data[action[2].filter]===action.status
//             )}
//         }
    
// }

// const action = [{
//     'filter':'status',
//     'task':'lulus',   
// }]