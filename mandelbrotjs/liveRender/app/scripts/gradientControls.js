        var picker_target;

        $(function() {
          $(document).ready(function() {
            $('#colorpicker').farbtastic(setColor);
          });
          
          // $('#gradient-items').append(gradientDiv());
          // $('#gradient-items').children('.gradient-item').last().css('top', 0);
          // $('#gradient-items').children('.gradient-item').last().css('background-color', '#000000');

          // $('#gradient-items').append(gradientDiv());
          // $('#gradient-items').children('.gradient-item').last().css('top', $('#gradient').height() + 1 + "px");
          // $('#gradient-items').children('.gradient-item').last().css('background-color', '#ffffff');
           
          $('#gradient').click(function(e) {
            var y = e.pageY - $(this).offset().top;
            
            // If we try to grab the color after we add the item, we'll get a transparent color.
            var color = getColor(y / $('#gradient').height() * 100);
            
            $('#gradient-items').append(gradientDiv());
            var item = $('#gradient-items').children('.gradient-item').last().get();
            $(item).css('top', y);
            $(item).css('background-color', color);

            picker_target = item;
            updateItems();
            $(item).trigger('click');
          });
          
          $('#showgradient').click(function() {
            $('#text').slideToggle();
            if($(this).html() == "Show CSS") {
              $(this).html("Hide CSS");
            } else {
              $(this).html("Show CSS");
            }
          });
          
          //$('#gradient-container').draggable();
          
          updateItems();
          $('.gradient-item').first().trigger('click');
        });

        function updateItems() {
          $('.gradient-item').draggable({
            containment: 'parent',
            axis: 'y',
            drag: function(event, ui) {
              dragItem();
            },
            start:function(event, ui) {
              $(this).trigger('click');
            }
          });

          $('.gradient-item').click(function() {
            picker_target = this;
            $('.gradient-item').removeClass('selected');
            $(this).addClass('selected');
            var color = rgb2hex($(this).css('background-color'));
            $.farbtastic($('#colorpicker')).setColor(color);
          });
          
          $('div.delete').click(function() {
            if($('#gradient-items').children('.gradient-item').length > 2) {
              $(this).parent().remove();
              dragItem();
            }
          });
          
          dragItem();
        }

        function setColor(color) {
          $(picker_target).css('background-color', color);
          dragItem();
        }

        function getColorList() {
          var colors = new Array();
          $('#gradient-items').children('.gradient-item').each(function() {
            var color = new Array();
            pos = $(this).position();
            color.col = $(this).css('background-color');
            color.pct = Math.round(pos.top / $('#gradient').height() * 100);
            colors.push(color);
          });
          
          colors.sort(sortColors);
          return colors;
        }

        function getColor(percent) {
          percent = Math.round(percent);
          var colors = getColorList();
          
          for(var i = 0; i < colors.length; i++) {
            var c = colors[i];
            if(c.pct > percent) {
              if(i == 0) {
                //alert("before: " + i + " " + c.col);
                return rgb2hex(c.col);
              } else {
                var prev = colors[i-1];
                //alert(percent + "% between " + (i - 1) + " (" + prev.col + ") and " + i + " (" + c.col + ")");
                return interpolateColors(prev.col, c.col, prev.pct, c.pct, percent);
              }
            }
          }
          //alert("after: " + colors[colors.length - 1].col);
          return rgb2hex(colors[colors.length - 1].col);
        }

        function getGradientColorsFromPicker(){
          var colors = new Array();
          $('#gradient-items').children('.gradient-item').each(function() {
            var aColor = {}

            aColor.color = $(this).css('background-color').substring(4).split(",");
            aColor.color[0] = parseInt(aColor.color[0]);
            aColor.color[1] = parseInt(aColor.color[1]);
            aColor.color[2] = parseInt(aColor.color[2]);
            
            pos = $(this).position();
            aColor.location = Math.round(pos.top / $('#gradient').height() * 100)
            
            colors.push(aColor);
          });
          
          colors.sort(function(a, b) { 
            return a.location - b.location;
          })
          return colors;
        }

        function dragItem() {
          var colors = getColorList();
          
          var gradient = "-moz-linear-gradient(";
          var webkit_gradient = "-webkit-gradient(linear, left top, left bottom, ";
          var items = new Array();
          var webkit_items = new Array();
          for(var i = 0; i < colors.length; i++) {
            webkit_items.push("color-stop(" + colors[i].pct + "%" + ", " + colors[i].col + ")");
            items.push(colors[i].col + " " + colors[i].pct + "%");
          }
          
          gradient += items.join(", ");
          gradient += ")";
          
          webkit_gradient += webkit_items.join(", ");
          webkit_gradient += ")";
          $('#text').html("background: " + gradient + "; <br/><br/>background: " + webkit_gradient + ";");
          $('#gradient').css('background', gradient);
          $('#gradient').css('background', webkit_gradient);
        }

        function sortColors(c1, c2) {
          return c1.pct - c2.pct;
        }

        function rgb2hex(rgb) {
          rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        function getRgbObject(color) {
          return color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        }

        function rgbObject2hex(rgb) {
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        function hex(x) {
          return ("0" + parseInt(x).toString(16)).slice(-2);
        }

        function interpolateColors(col1, col2, lower, upper, pos) {
          var x = (pos - lower) / (upper - lower);
          //alert(x + ": " + lower + " (" + col1 + ") /" + upper + " (" + col2 + ") /" + pos);
          return rgbObject2hex(rgbObjectInterp(getRgbObject(col1), getRgbObject(col2), x));
        }

        function rgbObjectInterp(rgb1, rgb2, x) {
          rgb = new Array();
          rgb[1] = Math.round(interp(rgb1[1], rgb2[1], x));
          rgb[2] = Math.round(interp(rgb1[2], rgb2[2], x));
          rgb[3] = Math.round(interp(rgb1[3], rgb2[3], x));
          return rgb;
        }

        function interp(a, b, x) {
          var r = (parseFloat(b) - parseFloat(a)) * parseFloat(x) + parseFloat(a);
          //r += a;
          //alert(a + ", " + b + ", " + x + ": " + r + "\n" + "b-a: " + (b-a) + " *x:" + ((b-a)*x));
          return r
        }

        function gradientDiv() {
          return "<div class='gradient-item'><img class='pointer' src='pointer.png'><div class='delete'></div></div>";
        }