
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(k){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        console.log("check: ",check)

        if (check){

            // const cough = document.getElementById('')
            console.log("this form",k);

            var form = document.querySelector("form");

            var data = new FormData(form);

            console.log(data)

            const formData = {};
            var output = "";
            for (const entry of data) {
                formData[entry[0]] = entry[1];
                output = output + entry[0] + "=" + entry[1] + "\r";
            };

            const userName = formData.name;
            const userEmail = formData.email;

            console.log(formData)


            // var result = output.match('/(cough\d=\d)/g').match('/\d+/g')*1;
            // const ageVal = (output.match(/age=\d/g))[0].match(/[\d]$/g)[0]*1 || 0;
            // const diabetesVal = (output.match(/diabetes=\d/g))[0].match(/[\d]$/g)[0]*1 || 0;
            // const foreignTravelVal = (output.match(/foreign=\d/g))[0].match(/[\d]$/g)[0]*1 || 0;

            const smokerVal = (output.match(/smoker=\d/g))[0].match(/[\d]$/g)[0]*1 || 0;
            const coughVal = (output.match(/cough=\d/g))[0].match(/[\d]$/g)[0]*1;
            const feverVal = (output.match(/fever=\d/g))[0].match(/[\d]$/g)[0]*1;
            const headacheVal = (output.match(/headache=\d/g))[0].match(/[\d]$/g)[0]*1;
            const fatigueVal = (output.match(/fatigue=\d/g))[0].match(/[\d]$/g)[0]*1;
            const dbVal = (output.match(/db=\d/g))[0].match(/[\d]$/g)[0]*1;
            const asthemaVal = (output.match(/asthema=\d/g))[0].match(/[\d]$/g)[0]*1;
            const sorethroatVal = (output.match(/sore_throat=\d/g))[0].match(/[\d]$/g)[0]*1;
            // const sputumVal = (output.match(/sputum=\d/g))[0].match(/[\d]$/g)[0]*1;



            const network = model1();


            console.log("before: ", network.exportMarginals()['covid'].print())

            // for model1
            const nameArray =['smoker', 'cough', 'fever', 'headache', 'fatigue', 'difficulty_breathing', 'sore_throat', 'asthema', ];
            const valArray = [smokerVal, coughVal, feverVal, headacheVal, fatigueVal, dbVal, sorethroatVal, asthemaVal, ];

            const symptoms ={
                smoker: smokerVal, 
                              cough: coughVal, 
                              fever: feverVal, 
                              headache: headacheVal,
                              fatigue: fatigueVal, 
                              difficulty_breathing: dbVal, 
                              sore_throat: sorethroatVal, 
                              asthema: asthemaVal, 
                            };


            // for model 2
            // const nameArray =['age', 'diabetes', 'forign','smoker', 'cough', 'fever', 'headache', 'fatigue', 'difficulty_breathing', 'sore_throat', 'asthema', 'sputum_production'];
            // const valArray = [ageVal, diabetesVal, foreignTravelVal, smokerVal, coughVal, feverVal, headacheVal, fatigueVal, dbVal, sorethroatVal, asthemaVal, sputumVal];

            const onlyActiveName = [];
            const onlyActiveVal = [];

            for(let i=0;i< valArray.length;i++){

                if (valArray[i] != 0){

                    onlyActiveName.push(nameArray[i])
                    onlyActiveVal.push(valArray[i])

                }
            }

            
            network.computeMarginals();
            const marginals = network.exportMarginals();

            console.log('before covid probability: ');
            marginals['covid'].print();

            network.observe(nameArray, 
                            valArray).then(
                ()=>{

                    console.log('after observe yes!')
                    network.computeMarginals();

                    const marginals = network.exportMarginals();

                    console.log('covid probability: ');
                    marginals['covid'].print();

                    const covidProb = marginals['covid'].flatten().arraySync()[1];


                    const success = document.getElementById('success')
                    const fail = document.getElementById('fail')

                    const formElem = document.getElementById('form');
                   
                    const resultElem = document.getElementById('result');


                    const candiNameElem = document.getElementById('candiName');
                    const candiContactElem = document.getElementById('candiContact');
                    const candiResultElem = document.getElementById('candiResult');


                    const yesDialog = `with ${covidProb.toFixed(4)*100}% probability we believe that you need to consult with your doctor immidiately`;
                    const noDialog = `with ${(1-covidProb).toFixed(4)*100}% probability we believe that you don't have to worry about it at all. but if you are still not sure, then we recommend to consult with your doctor `;

                    candiNameElem.innerHTML = formData.name;
                    candiContactElem.innerHTML = formData.email;
                    candiResultElem.innerHTML = (covidProb > 0.5)? yesDialog : noDialog;

                    formElem.style.display='none';
                    resultElem.style.display='initial';
                    if (marginals['covid'].flatten().arraySync()[1] > 0.5){

                        fail.style.display="initial";
                        success.style.display="none";


                    }else{

                        success.style.display="initial";
                        fail.style.display="none";
                    }

                    // firebase.database().ref('/users').once('value').then(function(snapshot) {


                    //     // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

                    //     // ...

                    //     // currUserId = 0;
                    //     // if(snapshot.val())
                    //     //     currUserId = (snapshot.val().length);


                    //     console.log('current user Id', currUserId);
                    // });


                        writeUserData(userName,userEmail, symptoms, covidProb )

                }
            )

            // console.log(output, coughVal);
        }

        // return check;
        return false;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf135;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });

        // console.log("laskdjflaksdfj")
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
    
    

})(jQuery);

