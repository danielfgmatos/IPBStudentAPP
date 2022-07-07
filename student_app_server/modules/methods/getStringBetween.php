<?php
namespace app\modules\methods;


class getStringBetween
{
    public static function getStringAnoBetween($stringTitulo,$from,$to)
    {
        $sub = substr($stringTitulo, strpos($stringTitulo,$from)+strlen($from),strlen($stringTitulo));
        return  "20".substr($sub,0,strpos($sub,$to));

    }

    public static function getStringSemestreBetween($stringTitulo,$from,$to)
    {
        $sub = substr($stringTitulo, strpos($stringTitulo,$from)+strlen($from),strlen($stringTitulo));
        return  substr($sub,0,strpos($sub,$to));

    }
}








