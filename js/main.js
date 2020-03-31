
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
            console.log("this form",k)

            var form = document.querySelector("form");

            var data = new FormData(form);
            var output = "";
            for (const entry of data) {
                output = output + entry[0] + "=" + entry[1] + "\r";
            };


            console.log("asjdlkfj: ",output)
            // var result = output.match('/(cough\d=\d)/g').match('/\d+/g')*1;
            const smokerVal = (output.match(/smoker=\d/g))[0].match(/[\d]$/g)[0]*1 || 0;
            const coughVal = (output.match(/cough=\d/g))[0].match(/[\d]$/g)[0]*1;
            const feverVal = (output.match(/fever=\d/g))[0].match(/[\d]$/g)[0]*1;
            const headacheVal = (output.match(/headache=\d/g))[0].match(/[\d]$/g)[0]*1;
            const fatigueVal = (output.match(/fatigue=\d/g))[0].match(/[\d]$/g)[0]*1;
            const dbVal = (output.match(/db=\d/g))[0].match(/[\d]$/g)[0]*1;
            const asthemaVal = (output.match(/asthema=\d/g))[0].match(/[\d]$/g)[0]*1;
            const sorethroatVal = (output.match(/sore_throat=\d/g))[0].match(/[\d]$/g)[0]*1;
            const sputumVal = (output.match(/sputum=\d/g))[0].match(/[\d]$/g)[0]*1;


            // calculate the probability of covid given the evidence

            const nodeNames = ['covid', 'cough', 'headache', 'fatigue', 'fever', 'smoker', 'difficulty_breathing', 'sore_throat', 'asthema', 'sputum_production' ]
            const dims =      [2,         2,          2,         2,        2,       2,                2,                  2,         2,             2,];

            const nodes = (
                function(){

                    const variableArray = [];
                    for(let i=0;i< nodeNames.length;i++){
                        variableArray.push(new Variable(nodeNames[i], dims[i]))
                    }

                    return variableArray;

                }()
            );

            // const cpdCovid       = new Factor(name='Mcovid',    tf.tensor([[0.96],[0.04]]));
            const cpdCovid       = new Factor(name='Mcovid',    tf.tensor([[0.90],[0.10]]));

            const cpdCough       = new Factor(name='covid-cough',                tf.tensor([[0.70, 0.30], [0.31 ,  0.69 ]]));
            const cpdHeadache    = new Factor(name='covid-headache',             tf.tensor([[0.80, 0.20], [0.87 ,  0.13 ]]));
            const cpdFatigue     = new Factor(name='covid-fatigue',              tf.tensor([[0.80, 0.20], [0.60 ,  0.40 ]]));
            const cpdFever       = new Factor(name='covid-fever',                tf.tensor([[0.70, 0.30], [0.11 ,  0.89 ]]));
            const cpdSmoker      = new Factor(name='covid-smoker',               tf.tensor([[0.72, 0.28], [0.78 ,  0.22 ]]));
            const cpdBreathing   = new Factor(name='covid-difficulty_breathing', tf.tensor([[0.94, 0.06], [0.813,  0.187]]));
            const cpdSoreThroat  = new Factor(name='covid-sore_throat',          tf.tensor([[0.92, 0.08], [0.86 ,  0.14 ]]));
            const cpdAsthema     = new Factor(name='covid-asthema',              tf.tensor([[0.98, 0.02], [0.60 ,  0.40 ]]));
            const cpdSputum      = new Factor(name='covid-sputum_production',    tf.tensor([[0.95, 0.05], [0.67 ,  0.33 ]]));

            // console.log(nodes[0])
            const network = new FactorGraph(nodes[0], false,false);

            network.append('covid', cpdCovid);

            network.append('covid', cpdCough);
            network.append('covid-cough', nodes[1]);

            network.append('covid', cpdHeadache);
            network.append('covid-headache', nodes[2]);

            network.append('covid', cpdFatigue);
            network.append('covid-fatigue', nodes[3]);

            network.append('covid', cpdFever);
            network.append('covid-fever', nodes[4]);

            network.append('covid', cpdSmoker);
            network.append('covid-smoker', nodes[5]);

            network.append('covid', cpdBreathing);
            network.append('covid-difficulty_breathing', nodes[6]);

            network.append('covid', cpdSoreThroat);
            network.append('covid-sore_throat', nodes[7]);

            network.append('covid', cpdAsthema);
            network.append('covid-asthema', nodes[8]);

            network.append('covid', cpdSputum);
            network.append('covid-sputum_production', nodes[9]);


            network.computeMarginals()

            console.log("before: ", network.exportMarginals()['covid'].print())


            const nameArray =['smoker', 'cough', 'fever', 'headache', 'fatigue', 'difficulty_breathing', 'sore_throat', 'asthema', 'sputum_production'];
            const valArray = [smokerVal, coughVal, feverVal, headacheVal, fatigueVal, dbVal, sorethroatVal, asthemaVal, sputumVal];


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
            // network.observe(onlyActiveName, 
            //                 onlyActiveVal).then(
                ()=>{

                    console.log('after observe yes!')
                    network.computeMarginals();
                    // const newMarginals = g.exportMarginals();

                    const marginals = network.exportMarginals();

                    console.log('covid probability: ');
                    marginals['covid'].print();
                    // for( node in marginals){
                    //     console.log('node: '+ node)
                    //     marginals[node].print()
                    // }

                    const success = document.getElementById('success')
                    const fail = document.getElementById('fail')

                    

                    if (marginals['covid'].flatten().arraySync()[1] > 0.5){

                        fail.style.display="initial"
                        success.style.display="none"


                    }else{

                        success.style.display="initial"
                        fail.style.display="none"
                    }
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