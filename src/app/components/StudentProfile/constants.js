const response = {
	"success": true,
	"data": {
		"id": 1,
		"full_name": "Andi Herman",
		"address": "Dago, Bandung",
		"birthday": "2014-11-07T21:20:15",
		"phone": "08123456788",
		"email": "andy@gmail.com",
		"status": "pending",
		"batch_id": 2,
    "campus_id":1,
		"batch": {
			"id": 2,
			"code_name": "Basilischi",
			"campus_id": 1
		},
		"campus":[
      {
        "campus_id":1,
         "campus_name":"#jambi jambi bergoyang",
          "batch"    : [{
            "id":1,
            "batch_name":"#1 abdul bacan"
          },
          {
            "id":2,
            "batch_name":"#2 abdul khohar"
          },
          {
            "id":3,
            "batch_name":"#3 alamak"
          }
        ]
      },
      {
        "campus_id":2,
        "campus_name":"#jambu ",
          "batch"    : [{
            "id":1,
            "batch_name":"#1 eriwandri bacan"
          },
          {
            "id":2,
            "batch_name":"#2 syauqi khohar"
          }]
        }
      ]
	}
}

export default response