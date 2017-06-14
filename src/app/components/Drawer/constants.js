

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
                    "batch":'#2 bait',
                    "status":"lulus"
                },
                {
                    'fullname':"frans",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bandung",
                    "batch":'#2 bait',
                    "status":"lulus"
                },
                {
                    'fullname':"bill",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bandung",
                    "batch":'#1 boss',
                    "status":"gagal"
                }
            ],
            'batches': {
                'total':4 
         }
        },
        {
            'id': 2,
            'city': 'jojga',
            'student':[
                {
                    'fullname':"wicki",
                    'email':'jhonwick@hadouken.com',
                    'phone':'09322020',
                    "campuses":"jogja",
                    "batch":'#2 linting',
                    "status":"lulus"
                },
                {
                    'fullname':"lovee",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"jogja",
                    "batch":'#3 linting',
                    "status":"lulus"
                },
                {
                    'fullname':"mamamia",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"jogja",
                    "batch":'#2 linting',
                    "status":"gagal"
                }
            ],
            'batches': {
                'total':2 
             }
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
                    "batch":'#3 doomed',
                    "status":"lulus"
                },
                {
                    'fullname':"brand",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"kalimantan",
                    "batch":'#2 bratt',
                    "status":"menunggu dokumen"
                },
                {
                    'fullname':"bratt",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"kalimantan",
                    "batch":'#2 bratt',
                    "status":"gagal"
                }
            ],
            'batches': {
                'total':3 
             }
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
                    "batch":'#3 baschilici',
                    "status":"lulus"
                },
                {
                    'fullname':"border",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bali",
                    "batch":'#2 alpacino',
                    "status":"gagal"
                },
                {
                    'fullname':"bill",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"bali",
                    "batch":'#1 ajis',
                    "status":"pending"
                }
            ],
            'batches': {
                'total':3 
            }
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
                    "batch":'#1 Camora',
                    "status":"lulus"
                },
                {
                    'fullname':"frans gagal",
                    'email':'franssinatra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"solo",
                    "batch":'#1 Camora',
                    "status":"lulus"
                },
                {
                    'fullname':"bill jean",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"solo",
                    "batch":'#1 Camora',
                    "status":"gagal"
                }
            ],
            'batches': {
            'total':1 
             }
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
                    "batch":2,
                    "status":"preparation"
                },
                {
                    'fullname':"fransaaslidepok",
                    'email':'franssinataslidepokra@hadouken.com',
                    'phone':'09322020',
                    "campuses":"depok",
                    "batch":2,
                    "status":"lulus"
                },
                {
                    'fullname':"bill depok",
                    'email':'billyjoel@hadouken.com',
                    'phone':'09322020',
                    "campuses":"depok",
                    "batch":2,
                    "status":"lulus"
                }
            ],
            'batches': {
            'total':2 
         }
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