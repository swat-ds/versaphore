<?php

// simple script to save workspace data as json for
// versaphore app

$json = file_get_contents('data.json');
$data = json_decode($json);

$new_workspace['workspaceName'] = $_GET['name'];
$new_workspace['sheetKey'] = $_GET['key'];
array_push($data,$new_workspace);

$json = json_encode($data);

$fh = fopen('data.json','w') or die ("can't open!");

fwrite($fh,$json);
fclose($fh);

?>