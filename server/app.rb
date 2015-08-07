require 'sinatra'
require 'sinatra/json'
require 'rack/cors'
require 'json'

use Rack::Cors do
    allow do
        origins '*'
        resource '*', :headers => :any, :methods => [ :get, :post, :options ]
    end
end

FRIENDS = [
    { id: 1, firstName: "John",   lastName: "", best: true,  birthday: Date.strptime('1982-06-21'), about: "Funny" },
    { id: 2, firstName: "Mary",   lastName: "", best: true,  birthday: Date.strptime('1987-03-21'), about: "Smart" },
    { id: 3, firstName: "Henry",  lastName: "", best: false, birthday: Date.strptime('1997-07-21'), about: "Kind"  },
    { id: 4, firstName: "Bombón", lastName: "", best: false, birthday: Date.strptime('2007-06-13'), about: "Aló"   }
];

before do
    response.headers['Access-Control-Allow-Origin'] = "*"
end

get '/friends' do
    #sleep 2
    json friends: FRIENDS
end

post '/friends' do
    params = JSON.parse(request.body.read)["friend"]
    friend = { id: FRIENDS.size + 1, firstName: params["firstName"], lastName: params["lastName"], about: params["about"], best: true, birthday: Date.strptime("2001-12-24") }
    FRIENDS << friend
    json friend: friend
end

get '/friends/:id' do
    json friend: FRIENDS.find { |f| f[:id] == params[:id].to_i }
end

get '/' do
    "hello"
end
