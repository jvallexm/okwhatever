

$(document).ready(function() {

    $('#datePicker')
        .datepicker({
            format: 'mm/dd/yyyy'
        })
        .on('changeDate', function(e) {
            // Revalidate the date field
            $('#eventForm').formValidation('revalidateField', 'date');
        });



    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            city: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 20
                    },
                        notEmpty: {
                        message: 'Please provide a city'
                    },
                    regexp: {
                        regexp: /^[a-z\s]+$/i,
                        message: 'Most cities have only letters... cmon now'
                    }
                }
            },
            state: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 20
                    },
                        notEmpty: {
                        message: 'Please provide a state'
                    },
                    regexp: {
                        regexp: /^[a-z\s]+$/i,
                        message: `Only letters please.`
                    }
                }
            },
            date: {
                validators: {
                    date: {
                        format: 'MM-DD-YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },
            gender: {
                validators: {
                    notEmpty: {
                        message: 'Please select a gender'
                    }
                }
            },
            sexuality: {
                validators: {
                    notEmpty: {
                        message: 'Please select a sexuality'
                    }
                }
            },
            fav1: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 50
                    },
                        notEmpty: {
                        message: 'please fill me out'
                    },
                    regexp: {
                        regexp: /^[a-z\s0-9]+$/i,
                        message: 'Can only contain letters and numbers'
                    }
                }
            },
            fav2: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 50
                    },
                        notEmpty: {
                        message: 'Please provide a favorite thing between 2 and 50 characters'
                    },
                    regexp: {
                        regexp: /^[a-z\s0-9]+$/i,
                        message: 'Can only contain letters and numbers'
                    }
                }
            },
            fav3: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 50
                    },
                        notEmpty: {
                        message: 'Please provide a favorite thing between 2 and 50 characters'
                    },
                    regexp: {
                        regexp: /^[a-z\s0-9]+$/i,
                        message: 'Can only contain letters and numbers'
                    }
                }
            },
            bio: {
                validators: {
                        stringLength: {
                        max: 250
                    },
                        notEmpty: {
                        message: 'Please fill out but do not exceed 250 characters'
                    }
                }
            },
            interestedIn: {
                validators: {
                        stringLength: {
                        max: 100
                    },
                        notEmpty: {
                        message: 'Please fill out but do not exceed 100 characters'
                    }
                }
            },


        }
           
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});

