<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitbacada9e479c8410e174ec2e62a6af4b
{
    public static $prefixLengthsPsr4 = array (
        'R' => 
        array (
            'Routes\\' => 7,
        ),
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Routes\\' => 
        array (
            0 => __DIR__ . '/../..' . '/routing',
        ),
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitbacada9e479c8410e174ec2e62a6af4b::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitbacada9e479c8410e174ec2e62a6af4b::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitbacada9e479c8410e174ec2e62a6af4b::$classMap;

        }, null, ClassLoader::class);
    }
}
