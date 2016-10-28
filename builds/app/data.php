<?php

// simple script to save workspace data as json for
// versaphore app

$json = file_get_contents('js/data.json');
$data = json_decode($json,true);

$new_workspace['workspaceName'] = $_GET['name'];
$new_workspace['sheetKey'] = $_GET['key'];
$workspace_name = $new_workspace['workspaceName'];

if( $_GET['action'] == "add") {

    array_push($data,$new_workspace);
    echo "Workspace $workspace_name  added.";
}

if( $_GET['action'] == "del") {

    foreach($data as $index => $workspace){
        if($workspace['sheetKey'] == $new_workspace['sheetKey']){
           unset($data[$index]);
        }
    }
    echo "Workspace $workspace_name deleted.";
}

$json = json_encode($data);

$fh = fopen('js/data.json','w') or die ("can't open!");

fwrite($fh,$json);
fclose($fh);

?>