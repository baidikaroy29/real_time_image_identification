function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded()
{
  console.log("Model Loaded!");
}

function draw()
{
  image( video, 0 , 0, 300, 300 );

  classifier.classify( video, gotResults);
}

var previous_result = " ";

function gotResults(error, result)
{
  if (error)
  {
    console.error(error);
  }
  else
  {
    if ((result[0].confidence > 0.5) && (previous_result != result[0]))
    {
      console.log(result);
      previous_result = result[0].label;
      var synth = window.speechSynthesis;
      var speak = "Object identified is - " + resul[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML = result[0].label;

      document.getElementById("result_object_accuraccy").innerHTML = resul[0].confidence.toFixed(3);
    }
  }
}