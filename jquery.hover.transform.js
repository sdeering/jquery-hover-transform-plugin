/* ---- jQuery/CSS3 element transition on hover / samdeering.com ---- */

(function( $ ) {

    /*
        jQuery Plugin: jQuery Hover Transform
        Author: Sam Deering
        Website: samdeering.com

        @filename: jquery.hover.transform.js
        @Requires: jQuery v1.9.1 or later
        @version: 1.0  19-FEB-2013
        @browsers: All modern browsers Chrome, Firefox, Safari, IE. Old browsers IE9, IE8.

        Features:
            + CSS3 Transition Tranforms on Hover triggered by JavaScript.
            + Cross Browser supported by IE8, IE9 and modern browsers compliant with CSS3 transitionopts.
            + Keyboard tab to active element captured and triggers hover state.
            + Specify child elements for CSS3 transformation effects on parent hover.
            + CSS transitions specified in CSS so they can be anything you want! :)

        Coming soon:
            - Auto tabindex injection
            - GPU enhanced transitions

        Demos:
            - Single elements scale - http://jsfiddle.net/YxHah/
            - Single elements scale & rotate - http://jsfiddle.net/kWqDL/
            - Single elements A few experiments - http://jsfiddle.net/wst62/
            - Container element triggers scale on child - http://jsfiddle.net/FHyuC/
            - One child element triggers another - http://jsfiddle.net/aHjD5/

    */

    $.fn.hoverTransform = function(options)
    {

        /*
           Default setting.
        */
        var defaults = {

            childTriggerElements: '',  //child elements that (hover) trigger transforms

            childTransitionElements: '', //child elements that transform

            transitionContainerClass: 'transition-container', //transition container class

            transitionBaseClass: 'transition-transform', //effect easing class

            transitionHoverClass: 'transition-active',  //hover effect class

            selfTrigger: true, //self element triggers transform on hover

            selfTransition: true, //self element transforms on hover

            autoTabIndex: false //elements are given an incremented tab index

        }


        /*
            User specified settings.
        */
        var opts = $.extend({},defaults,options);


        /*
           Get key code.
        */
        function getKeyCode(key)
        {
            //return the key code
            return (key == null) ? event.keyCode : key.keyCode;
        }

        /*
            For usabiity capture keyboard tabbing and trigger hover event.
        */
        $(document).on('keyup', function (eventObj)
        {
            //tab keycode = 9
            if (getKeyCode(eventObj) == '9')
            {
                var $el = $(document.activeElement);
                //remove any current active elements
                $('.'+opts.transitionBaseClass).removeClass(opts.transitionHoverClass);
                if ($el.hasClass(opts.transitionContainerClass)) $el.find('.'+opts.transitionBaseClass).addClass(opts.transitionHoverClass);
            }
        });


        /*
           Attach hover event.
        */
        function _attachHover($el)
        {
            $el.on('mouseover', function ()
            {
                /*
                   Add CSS transition class to self.
                */
                if ($el.hasClass(opts.transitionBaseClass)) $el.addClass(opts.transitionHoverClass);

                /*
                   Add CSS transition class to children.
                */
                if (opts.childTransitionElements) $el.find('.'+opts.transitionBaseClass).addClass(opts.transitionHoverClass);

            }).on('mouseout', function ()
            {
                /*
                   Remove CSS transition class to self.
                */
                if ($el.hasClass(opts.transitionBaseClass)) $el.removeClass(opts.transitionHoverClass);

                /*
                   Remove CSS transition class to children.
                */
                if (opts.childTransitionElements) $el.find('.'+opts.transitionBaseClass).removeClass(opts.transitionHoverClass);
            });
        }


        return this.each(function(i, v)
        {
            $el = $(v);

            /*
               Self trigger
            */
            if (opts.selfTrigger) _attachHover($el);

            /*
               Self transition
            */
            if (opts.selfTransition) $el.addClass(opts.transitionBaseClass);

            /*
               Add transition base class to child transition elements
            */
            if (opts.childTransitionElements) $el.find(opts.childTransitionElements).addClass(opts.transitionBaseClass);

            /*
               Add class to children trigger elementopts.
            */
            if (opts.childTriggerElements) _attachHover($el.find(opts.childTriggerElements));
        });

    };

    /*
        Internet Explorer sniffer code to add class to body tag for IE version.
        Can be removed if your using something like Modernizer.
    */
    var ie = (function ()
    {

        var undef,
        v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');

        while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]);

        //append class to body for use with browser support
        if (v > 4)
        {
            $('body').addClass('ie' + v);
        }

    }());


})( jQuery );  //closure
