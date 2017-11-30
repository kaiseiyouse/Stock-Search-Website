(function () {
    'use strict';
    angular
        .module('searchbox', ['ngMaterial'])
        .controller('DemoCtrl', DemoCtrl);

    function DemoCtrl ($timeout, $q, $log, $http) {
        var self = this;

        self.simulateQuery = false;
        self.isDisabled    = false;

        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;
        self.focus = focus;


        function querySearch (query) {
          if(query.trim() === '') return;
            var url = "https://stock-183802.appspot.com/api/autocomplete?input=" + query;
            var deferred = $q.defer();
            $http.get(url)
                .then(function (res) {
                    var data = res.data;
                    data = data.map(function (t) {
                        return t["Symbol"] + " - " + t["Name"] + " (" + t["Exchange"] + ")";
                    })
                    deferred.resolve(data);
                })
            return deferred.promise;
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
            if(text.trim() !== '') {
                $('#submitButton').prop('disabled', false);
                $('#hint').css("visibility", "hidden");
                $('md-autocomplete-wrap').css('border', '');
            }
            else {
                $('#submitButton').prop('disabled', true);
                $('#hint').css("visibility", "visible");
                $('md-autocomplete-wrap').css('border', '2px solid red');
            }
        }

        function selectedItemChange(item) {
           $('#form1 input').val(item.split('-')[0].trim());
        }
        
        function focus() {
            console.log("is focused");
            $('md-autocomplete-wrap').css('border', '2px solid blue');
        }


    }
})();