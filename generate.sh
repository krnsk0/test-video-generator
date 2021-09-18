# https://bytefreaks.net/gnulinux/bash/ffmpeg-create-a-video-countdown

rm -rf out.mp4
#This example will create a 3 second video, with 100 frames per second and it will print the elapsed and remaining times using a two second accuracy.
fps=100;
seconds=3;
mantissaDigits=2;
upperFont=600;
lowerFont=100;
ffmpeg -loop 1 -i ./background.png -c:v libx264 -r $fps -t $seconds -pix_fmt yuv420p -vf "fps=$fps,drawtext=fontcolor=yellow:fontsize=$upperFont:x=(w-text_w)/2:y=(h-text_h)/2:text='%{eif\:($seconds-t)\:d}.%{eif\:(mod($seconds-t, 1)*pow(10,$mantissaDigits))\:d\:$mantissaDigits}',drawtext=fontfile='/usr/share/fonts/urw-base35/C059-Bold.otf':fontcolor=yellow:fontsize=$lowerFont:x=(w-text_w)/2:y=((h-text_h)/2)+$upperFont:text='Elapsed\: %{eif\:(t)\:d}.%{eif\:(mod(t, 1)*pow(10,$mantissaDigits))\:d\:$mantissaDigits}'" "out.mp4";
