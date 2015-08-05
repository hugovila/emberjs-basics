require 'sinatra'
require 'sinatra/json'

FRIENDS = [
    { id: 1, firstName: "John",   lastName: "", best: true,  birthday: Date.strptime('1982-06-21'), about: "Funny" },
    { id: 2, firstName: "Mary",   lastName: "", best: true,  birthday: Date.strptime('1982-06-21'), about: "Smart" },
    { id: 3, firstName: "Henry",  lastName: "", best: false, birthday: Date.strptime('1982-06-21'), about: "Kind"  },
    { id: 4, firstName: "Bonbón", lastName: "", best: false, birthday: Date.strptime('1982-06-13'), about: "Aló"   }
];

get '/friends' do
    response.headers['Access-Control-Allow-Origin'] = "*"
    json FRIENDS
end

get '/' do
    "hello"
end
