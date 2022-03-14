

const express = required("express");
const mongoose = required("moongoose");

const app = express();
 app.use(express.json());

 const connect = () => {
     return mongoose.connect();
 };


  const userschema = new mongoose.Schema( {
    firstName : { type : string, required : true },
    middleName : { type : string, required : false },
    lastName :  { type : string, required : true },
    age : { type : Number, required : true},
    email : {type : string, required : true, unique : true},
    address : {type : string, required : true},
    gender : {type : string, required : true},
  },{
      timestamps : true
  }
  );

  const User  = mongoose.model("users",userschema);

  const branchschema = new mongoose.Schema( {
    name : { type : string, required : true },
    address : {type : string, required : true},
    ifsc : {type : string, required : true},
    micr : {type : string, required : true}
  },{
      timestamps : true
  }
  );

  const Branch  = mongoose.model("branches",branchschema);

  const masterschema = new mongoose.Schema (
      {
        balance : {type : Number, required : true},
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true,
        }
        
      },{
        timestamps : true
    }
  );

  const Master = mongoose.model("masters",masterschema);

/* account_number ( required and should be unique)
balance ( required )
interestRate ( required )
createdAt (required)
updatedAt (required) */

  const accountschema = new mongoose.Schema (
      {
          accountNumber : {type : Number,required : true, unique : true},
          masterId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "masters",
            required : true,
          },
          interestRate : {type : Number,required : true},
          userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "user",
                required : true,
          },
      },{
          timestamps : true,
      }
  );
  const Account = mongoose.model("accounts",accountschema);


/*account_number ( required and should be unique)
balance ( required )
interestRate ( required )
startDate ( required )
maturityDate (required ) */

const fixedAccount = new mongoose.Schema (
    {
        accountId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "accounts",
            required : true,
        },
        startDate : {type :new Date,required : true},
        maturitydate : {type : new Date}
    }
);

app.get("/masters",async (res,req) => {
    try{
        const masters = await Master.find().lean().exec();

        return res.status(200).send({ masters : masters });
    }
    catch(err) {
        return res.status(500).send({message : "Something Went Wrong,Try Again later"});
    }
});
