/*  ******************************
  Accordion
  Author: Jack Lukic
  Notes: First Commit July 19, 2012

  Simple accordion design
******************************  */

;(function ($, window, document, undefined) {

$.fn.accordion = function(parameters) {
  var
    $allModules     = $(this),

    settings        = ( $.isPlainObject(parameters) )
      ? $.extend(true, {}, $.fn.accordion.settings, parameters)
      : $.fn.accordion.settings,

    className       = settings.className,
    namespace       = settings.namespace,
    selector        = settings.selector,
    error           = settings.error,

    eventNamespace  = '.' + namespace,
    moduleNamespace = 'module-' + namespace,
    moduleSelector  = $allModules.selector || '',

    time            = new Date().getTime(),
    performance     = [],

    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),
    invokedResponse
  ;
  $allModules
    .each(function() {
      var
        $module  = $(this),
        $title   = $module.find(selector.title),
        $icon    = $module.find(selector.icon),
        $content = $module.find(selector.content),

        element  = this,
        instance = $module.data(moduleNamespace),
        module
      ;

      module = {

        initialize: function() {
          module.debug('Initializing accordion with bound events', $module);
          // initializing
          $title
            .on('click' + eventNamespace, module.event.click)
          ;
          module.instantiate();
        },

        instantiate: function() {
          $module
            .data(moduleNamespace, module)
          ;
        },

        destroy: function() {
          module.debug('Destroying previous accordion for', $module);
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
        },

        event: {
          click: function() {
            module.verbose('Title clicked', this);
            var
              $activeTitle = $(this),
              index        = $title.index($activeTitle)
            ;
            module.toggle(index);
          },
          resetStyle: function() {
            module.verbose('Resetting styles on element', this);
            $(this)
              .removeAttr('style')
              .children()
                .removeAttr('style')
            ;
          }
        },

        toggle: function(index) {
          module.debug('Toggling content content at index', index);
          var
            $activeTitle  = $title.eq(index),
            contentIsOpen = $activeTitle.hasClass(className.active)
          ;
          if(contentIsOpen) {
            if(settings.collapsible) {
              module.close(index);
            }
            else {
              module.debug('Cannot close accordion content collapsing is disabled');
            }
          }
          else {
            module.open(index);
          }
        },

        open: function(index) {
          var
            $activeTitle     = $title.eq(index),
            $activeContent   = $activeTitle.next($content),
            $previousTitle   = $title.filter('.' + className.active),
            $previousContent = $previousTitle.next($title),
            contentIsOpen    =  ($previousTitle.size() > 0)
          ;
          if( !$activeContent.is(':animated') ) {
            module.debug('Opening accordion content', $activeTitle);
            if(settings.exclusive && contentIsOpen) {
              $previousTitle
                .removeClass(className.active)
              ;
              $previousContent
                .stop()
                .children()
                  .animate({
                    opacity: 0
                  }, settings.speed, module.event.resetStyle)
                  .end()
                .slideUp(settings.speed , settings.easing, function() {
                  $previousContent
                    .removeClass(className.active)
                    .removeAttr('style')
                    .children()
                      .removeAttr('style')
                  ;
                })
              ;
            }
            $activeTitle
              .addClass(className.active)
            ;
            $activeContent
              .stop()
              .children()
                .removeAttr('style')
                .end()
              .slideDown(settings.speed, settings.easing, function() {
                $activeContent
                  .addClass(className.active)
                  .removeAttr('style')
                ;
                $.proxy(settings.onOpen, $activeContent)();
                $.proxy(settings.onChange, $activeContent)();
              })
            ;
          }
        },

        close: function(index) {
          var
            $activeTitle   = $title.eq(index),
            $activeContent = $activeTitle.next($content)
          ;
          module.debug('Closing accordion content', $activeTitle);
          $activeTitle
            .removeClass(className.active)
          ;
          $activeContent
            .removeClass(className.active)
            .show()
            .stop()
            .children()
              .animate({
                opacity: 0
              }, settings.speed, module.event.resetStyle)
              .end()
            .slideUp(settings.speed, settings.easing, function(){
              $activeContent
                .removeAttr('style')
              ;
              $.proxy(settings.onClose, $activeContent)();
              $.proxy(settings.onChange, $activeContent)();
            })
          ;
        },

        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if(value !== undefined) {
            if( $.isPlainObject(name) ) {
              $.extend(true, settings, name);
            }
            else {
              settings[name] = value;
            }
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          module.debug('Changing internal', name, value);
          if(value !== undefined) {
            if( $.isPlainObject(name) ) {
              $.extend(true, module, name);
            }
            else {
              module[name] = value;
            }
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.moduleName + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.moduleName + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          module.error = Function.prototype.bind.call(console.error, console, settings.moduleName + ':');
          module.error.apply(console, arguments);
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Element'        : element,
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 100);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if($allModules.size() > 1) {
              title += ' ' + '(' + $allModules.size() + ')';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && instance !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( instance[value] ) && (depth != maxDepth) ) {
                instance = instance[value];
              }
              else if( $.isPlainObject( instance[camelCaseValue] ) && (depth != maxDepth) ) {
                instance = instance[camelCaseValue];
              }
              else if( instance[value] !== undefined ) {
                found = instance[value];
                return false;
              }
              else if( instance[camelCaseValue] !== undefined ) {
                found = instance[camelCaseValue];
                return false;
              }
              else {
                module.error(error.method);
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if($.isArray(invokedResponse)) {
            invokedResponse.push(response);
          }
          else if(typeof invokedResponse == 'string') {
            invokedResponse = [invokedResponse, response];
          }
          else if(response !== undefined) {
            invokedResponse = response;
          }
          return found;
        }
      };
      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          module.destroy();
        }
        module.initialize();
      }
    })
  ;
  return (invokedResponse !== undefined)
    ? invokedResponse
    : this
  ;
};

$.fn.accordion.settings = {
  name  : 'Accordion',

  debug       : true,
  verbose     : true,
  performance : true,

  exclusive   : true,
  collapsible : true,

  onOpen      : function(){},
  onClose     : function(){},
  onChange    : function(){},

  error: {
    method    : 'The method you called is not defined'
  },

  className   : {
    active    : 'active',
    hover     : 'hover'
  },

  selector    : {
    title     : '.title',
    icon      : '.icon',
    content   : '.content'
  },

  speed       : 500,
  easing      : 'easeInOutQuint'

};

})( jQuery, window , document );
