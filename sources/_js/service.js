var baseUrl = 'https://astronautjs.alexslx.xyz/api/';

/*
 * Routes
 * category, place, account
 */
var http = {};

/*
 * Method GET
 * http.get('Routes', callback);
 */
http.get = function(url, callback){
  $.ajax({
    url: baseUrl+url,
    success: function(response) {
      callback({status: 'success', data: response});
    },
    error: function(response){
      callback({status: 'error', data: response});
    }
  });
};

/*
 * Method POST
 * http.post('Routes', {name: 'newName', picture:'image.svg'}, callback);
 */
http.post = function(url, data, callback){
  $.post(baseUrl+url,
      data,
      function(response, status){
          callback({status: status, data: response});
      });
};

/*
 * Method PUT
 * http.put('Routes', {name: 'yourName'}, callback);
 * http.put('visitedPlaces', {id: idAccount, place: idPlace}, callback);
 */
http.put = function(url, data, callback){
  $.ajax({
        url: baseUrl+url,
        type: 'PUT',
        data: data,
        dataType: 'json',
        success: function(response){
          callback({status: 'success', data: response});
        },
        error: function(response){
          callback({status: 'error', data: response});
        }
  });
};

/*
 * Method DELETE
 * http.delete('Routes', {_id: 'yourId'}, callback);
 */
http.delete = function(url, data, callback){
  $.ajax({
        url: baseUrl+url,
        type: 'DELETE',
        data: data,
        dataType: 'json',
        success: function(response){
          callback({status: 'success', data: response});
        },
        error: function(response){
          callback({status: 'error', data: response});
        }
  });
};
