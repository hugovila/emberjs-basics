require 'sinatra'
require 'sinatra/json'

FRIENDS = [
    { id: 1, firstName: "John",   lastName: "", best: true,  birthday: Date.strptime('1982-06-21'), about: "Funny" },
    { id: 2, firstName: "Mary",   lastName: "", best: true,  birthday: Date.strptime('1982-06-21'), about: "Smart" },
    { id: 3, firstName: "Henry",  lastName: "", best: false, birthday: Date.strptime('1982-06-21'), about: "Kind"  },
    { id: 4, firstName: "Bonbón", lastName: "", best: false, birthday: Date.strptime('1982-06-13'), about: "Aló"   }
];

before do
    response.headers['Access-Control-Allow-Origin'] = "*"
end

get '/friends' do
    json FRIENDS
end

get '/friends/:id' do
    json FRIENDS.find { |f| f[:id] == params[:id].to_i }
end

get '/' do
    "hello"
end
