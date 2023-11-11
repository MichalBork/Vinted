<?php

namespace App\service;

class Service
{

    public function getCookies($url)
    {
        $options = array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_AUTOREFERER => true,
            CURLOPT_CONNECTTIMEOUT => 120,
            CURLOPT_TIMEOUT => 120,
            CURLOPT_MAXREDIRS => 10,
            CURLINFO_HEADER_OUT => true,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1
        );

        $ch = curl_init($url);
        curl_setopt_array($ch, $options);

        $response = curl_exec($ch);

        if ($response === false) {
            die(curl_error($ch));
        }

        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($response, 0, $headerSize);

        $headerLines = explode("\r\n", $header);

        $cookies = array();

        foreach ($headerLines as $line) {
            if (strpos($line, 'Set-Cookie:') === 0) {
                $cookie = str_replace('Set-Cookie: ', '', $line);
                $cookies[] = $cookie;
            }
        }

        $stringCookies = '';
        foreach ($cookies as $cookie) {
            $stringCookies .= $cookie . ';';
        }

        return $stringCookies;
        curl_close($ch);
    }

    public function getWebPage($url, $cookiesIn = ''): array
    {
        $options = array(
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER => true,     //return headers in addition to content
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING => "",       // handle all encodings
            CURLOPT_AUTOREFERER => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT => 120,      // timeout on response
            CURLOPT_MAXREDIRS => 10,       // stop after 10 redirects
            CURLINFO_HEADER_OUT => true,
            CURLOPT_SSL_VERIFYPEER => true,     // Validate SSL Certificates
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_COOKIE => $cookiesIn
        );

        $ch = curl_init($url);
        curl_setopt_array($ch, $options);
        $rough_content = curl_exec($ch);
        $err = curl_errno($ch);
        $errmsg = curl_error($ch);
        $header = curl_getinfo($ch);
        if ($rough_content === false) {
            die(curl_error($ch));
        }

        list($headers, $json_content) = explode("\r\n\r\n", $rough_content, 2);

        $http_lines = explode("\n", $headers);
        $http_status = null;
        foreach ($http_lines as $line) {
            if (stripos($line, 'HTTP/') === 0) {
                $http_status = $line;
                break;
            }
        }

        if ($http_status !== null && strpos($http_status, '200 OK') !== false) {
            $json_data = json_decode($json_content, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $json_data;
            } else {
                echo 'Błąd dekodowania JSON: ' . json_last_error_msg();
            }
        } else {
            echo 'Błąd żądania HTTP. Kod statusu: ' . $http_status;
        }
        return json_decode($rough_content, true);

    }

}



