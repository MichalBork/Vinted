<?php

namespace App\Controller;

use App\service\Service;

class FrontController
{

    public function __construct(
        private readonly Service $service = new Service()
    )
    {

    }

    public function main()
    {

        //array(6) { ["items-per-page"]=> string(2) "20" ["color"]=> string(1) "0" ["size"]=> string(1) "0" ["minPrice"]=> string(1) "1" ["maxPrice"]=> string(3) "100" ["productName"]=> string(1) "1" }

        $color = '';
        $size = '';
        $minPrice = '';
        $maxPrice = '';


        if (isset($_GET['color']) && $_GET['color'] != 0){
            $color = $_GET['color'];
        }

        if (isset($_GET['size']) && $_GET['size'] != 0){
            $size = $_GET['size'];
        }

        if (isset($_GET['minPrice'])){
            $minPrice = $_GET['minPrice'];
        }

        if (isset($_GET['maxPrice'])){
            $maxPrice = $_GET['maxPrice'];
        }

        if (!isset($_GET['productName'])){
            echo json_encode([]);
            return;
        }

        $productName = $_GET['productName'];


        $cookies = $this->service->getCookies('https://www.vinted.pl/');


        $data = $this->service->getWebPage("https://www.vinted.pl/api/v2/catalog/items?page=1&per_page=150&search_text=$productName&catalog_ids=$color&color_ids=&brand_ids=&size_ids=$size&material_ids=&video_game_rating_ids=&price_from=$minPrice&currency=PLN&price_to=$maxPrice", $cookies);



        echo json_encode($data);
        return;


    }

    public function x()
    {
        echo file_get_contents('index.html');

    }

}
