function checkNull(method,artistId,venue) {
    let query;
    let dependencyArray;
    switch (method) {
        case "INSERT":
            if(artistId==0||artistId.trim().toUpperCase()==="NULL"||artistId.trim()===""){
                if(venue==0||venue.trim().toUpperCase()==="NULL"||venue.trim()===""){
                    query = 'INSERT INTO EVENT (eventName,start,end,venue,cost,description,imagePath,organizer,creator,artistId) VALUES(?,?,?,?,?,?,?,?,?,?)';
                    dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,artistId]
            }else{
                query = 'INSERT INTO EVENT (eventName,start,end,venue,cost,description,imagePath,organizer,creator,artistId) VALUES(?,?,?,?,?,?,?,?,?,?)';
                dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,artistId]
            }
            }else{
                if(venue==0||venue.trim().toUpperCase()==="NULL"||venue.trim()===""){
                query = 'INSERT INTO EVENT (eventName,start,end,venue,cost,description,imagePath,organizer,creator,artistId) VALUES(?,?,?,?,?,?,?,?,?,?)';
                dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,artistId]
                }else{
                    query = 'INSERT INTO EVENT (eventName,start,end,venue,cost,description,imagePath,organizer,creator,artistId) VALUES(?,?,?,?,?,?,?,?,?,?)';
                    dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,artistId]
                }
            }
            break;
        case "UPDATE":
            
        default:
            break;
    }

    
}

    

let query;
let dependencyArray;
    if(artistId==0||artistId.trim().toUpperCase()==="NULL"||artistId.trim()===""){
        if(venue==0||venue.trim().toUpperCase()==="NULL"||venue.trim()===""){
            query = 'UPDATE EVENT SET eventName=?,start=?,end=?,venue=NULL,cost=?,description=?,imagePath=?,organizer=?,creator=?,artistId=NULL WHERE EVENTID=?';
            dependencyArray = [eventName,start,end,cost,desc,imgPath,organizer,creator,eid]
        }else{
            query = 'UPDATE EVENT SET eventName=?,start=?,end=?,venue=?,cost=?,description=?,imagePath=?,organizer=?,creator=?,artistId=NULL WHERE EVENTID=?';
            dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,eid]
        }
    }else{
        if(venue==0||venue.trim().toUpperCase()==="NULL"||venue.trim()===""){
            query = 'UPDATE EVENT SET eventName=?,start=?,end=?,venue=NULL,cost=?,description=?,imagePath=?,organizer=?,creator=?,artistId=? WHERE EVENTID=?';
            dependencyArray = [eventName,start,end,cost,desc,imgPath,organizer,creator,artistId,eid]
        }else{
            query = 'UPDATE EVENT SET eventName=?,start=?,end=?,venue=?,cost=?,description=?,imagePath=?,organizer=?,creator=?,artistId=? WHERE EVENTID=?';
            dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,artistId,eid]
        }
    }