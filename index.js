(function(module) {

    /**
     * Basic Values (http://tools.ietf.org/html/rfc3986#page-11)
     *
     * This specification uses the Augmented Backus-Naur Form (ABNF)
     * notation of [RFC2234], including the following core ABNF syntax rules
     * defined by that specification: ALPHA (letters), CR (carriage return),
     * DIGIT (decimal digits), DQUOTE (double quote), HEXDIG (hexadecimal
     * digits), LF (line feed), and SP (space).  The complete URI syntax is
     * collected in Appendix A.
     *
     * @type {string}
     */

    /**
     * Digit (http://tools.ietf.org/html/rfc2234#page-10)
     *
     * DIGIT =  %x30-39 ; 0-9
     *
     * @type {string}
     */
    var digit = '0-9',
        digitOnly = '[' + digit + ']';

    /**
     * Alpha (http://tools.ietf.org/html/rfc2234#page-11)
     *
     * ALPHA =  %x41-5A / %x61-7A   ; A-Z / a-z
     *
     * @type {string}
     */
    var alpha = 'a-zA-Z';

    /**
     * Hexadecimal Digit (http://tools.ietf.org/html/rfc2234#page-11)
     *
     * HEXDIG =  DIGIT / "A" / "B" / "C" / "D" / "E" / "F"
     *
     * @type {string}
     */
    var hexDigit = digit + 'a-fA-F',
        hexDigitOnly = '[' + hexDigit + ']';

    /**
     * Unreserved (http://tools.ietf.org/html/rfc3986#page-13)
     *
     * Characters that are allowed in a URI but do not have a reserved
     * purpose are called unreserved.  These include uppercase and lowercase
     * letters, decimal digits, hyphen, period, underscore, and tilde.
     *
     * unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *
     * @type {string}
     */
    var unreserved = alpha + digit + '-\\._~';

    /**
     * Percent Encoded (http://tools.ietf.org/html/rfc3986#page-12)
     *
     *  percent-encoding mechanism is used to represent a data octet in a
     * component when that octet's corresponding character is outside the
     * allowed set or is being used as a delimiter of, or within, the
     * component.  A percent-encoded octet is encoded as a character
     * triplet, consisting of the percent character "%" followed by the two
     * hexadecimal digits representing that octet's numeric value.  For
     * example, "%20" is the percent-encoding for the binary octet
     * "00100000" (ABNF: %x20), which in US-ASCII corresponds to the space
     * character (SP).
     *
     * pct-encoded = "%" HEXDIG HEXDIG
     *
     * @type {string}
     */
    var pctEncoded = '%' + hexDigit;

    /**
     * Sub Delimiters (http://tools.ietf.org/html/rfc3986#page-13)
     *
     *
     *
     * sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
     *
     * @type {string}
     */
    var subDelims = '!$&\'()*+,;=';

    /**
     * PChar (http://tools.ietf.org/html/rfc3986#page-23)
     *
     * pchar = unreserved / pct-encoded / sub-delims / ":" / "@"
     *
     * @type {string}
     */
    var pchar = unreserved + pctEncoded + subDelims + ':@';

    /**
     * Alternative Rules (http://tools.ietf.org/html/rfc2234#page-6)
     *
     * ements separated by forward slash ("/") are alternatives.
     *
     * @type {string}
     */
    var or = '|';

    /**
     * Rule to support zero-padded addresses.
     *
     * @type {string}
     */
    var zeroPad = '0?';

    /**
     * dec-octect (http://tools.ietf.org/html/rfc3986#page-20)
     *
     * dec-octet   = DIGIT                ; 0-9
     *            / %x31-39 DIGIT         ; 10-99
     *            / "1" 2DIGIT            ; 100-199
     *            / "2" %x30-34 DIGIT     ; 200-249
     *            / "25" %x30-35          ; 250-255
     *
     * @type {string}
     */
    var decOctect = '(' + zeroPad + zeroPad + digitOnly + or + zeroPad + '[1-9]' + digitOnly + or + '1' + digitOnly + digitOnly + or + '2' + '[0-4]' + digitOnly + or + '25' + '[0-5])';

    /**
     * cidr (http://tools.ietf.org/html/rfc4632#page-5)
     *
     * cidr       = DIGIT                ; 0-9
     *            / %x31-32 DIGIT         ; 10-29
     *            / "3" %x30-32           ; 30-32
     *
     * @type {string}
     */
    var cidr = digitOnly + or + '[1-2]' + digitOnly + or + '3' + '[0-2]';

    /**
     * IPv4address (http://tools.ietf.org/html/rfc3986#page-20)
     *
     * A host identified by an IPv4 literal address is represented in
     * dotted-decimal notation (a sequence of four decimal numbers in the
     * range 0 to 255, separated by "."), as described in [RFC1123] by
     * reference to [RFC0952].  Note that other forms of dotted notation may
     * be interpreted on some platforms, as described in Section 7.4, but
     * only the dotted-decimal form of four octets is allowed by this
     * grammar.
     *
     * IPv4address = dec-octet "." dec-octet "." dec-octet "." dec-octet
     *
     * @type {string}
     */
    var IPv4address = '(' + decOctect + '\\.){3}' + decOctect + '(\\/(' + cidr + '))?';

    /**
     * IPv6 Address (http://tools.ietf.org/html/rfc3986#page-20)
     *
     * A 128-bit IPv6 address is divided into eight 16-bit pieces.  Each
     * piece is represented numerically in case-insensitive hexadecimal,
     * using one to four hexadecimal digits (leading zeroes are permitted).
     * The eight encoded pieces are given most-significant first, separated
     * by colon characters.  Optionally, the least-significant two pieces
     * may instead be represented in IPv4 address textual format.  A
     * sequence of one or more consecutive zero-valued 16-bit pieces within
     * the address may be elided, omitting all their digits and leaving
     * exactly two consecutive colons in their place to mark the elision.
     *
     * IPv6address =                            6( h16 ":" ) ls32
     *             /                       "::" 5( h16 ":" ) ls32
     *             / [               h16 ] "::" 4( h16 ":" ) ls32
     *             / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
     *             / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
     *             / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
     *             / [ *4( h16 ":" ) h16 ] "::"              ls32
     *             / [ *5( h16 ":" ) h16 ] "::"              h16
     *             / [ *6( h16 ":" ) h16 ] "::"
     *
     * ls32        = ( h16 ":" h16 ) / IPv4address ; least-significant 32 bits of address
     *
     * h16         = 1*4HEXDIG ; 16 bits of address represented in hexadecimal
     *
     * @type {string}
     */
    var h16 = '(' + hexDigitOnly + '){1,4}',
        ls32 = '(' + h16 + ':' + h16 + '|' + IPv4address + ')',
        IPv6SixHex = '(' + h16 + ':){6}' + ls32,
        IPv6FiveHex = '::(' + h16 + ':){5}' + ls32,
        IPv6FourHex = h16 + '::(' + h16 + ':){4}' + ls32,
        IPv6ThreeeHex = '(' + h16 + ':){0,1}' + h16 + '::(' + h16 + ':){3}' + ls32,
        IPv6TwoHex = '(' + h16 + ':){0,2}' + h16 + '::(' + h16 + ':){2}' + ls32,
        IPv6OneHex = '(' + h16 + ':){0,3}' + h16 + '::' + h16 + ':' + ls32,
        IPv6NoneHex = '(' + h16 + ':){0,4}' + h16 + '::' + ls32,
        IPv6NoneHex2 = '(' + h16 + ':){0,5}' + h16 + '::' + h16,
        IPv6NoneHex3 = '(' + h16 + ':){0,6}' + h16 + '::',
        IPv6address = '((' + IPv6SixHex + or + IPv6FiveHex + or + IPv6FourHex + or + IPv6ThreeeHex + or + IPv6TwoHex + or + IPv6OneHex + or + IPv6NoneHex + or + IPv6NoneHex2 + or + IPv6NoneHex3 + ')(\\/(' + cidr + '))?)';

    /**
     * IP Future Versions (http://tools.ietf.org/html/rfc3986#page-19)
     *
     * IPvFuture  = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
     *
     * @type {string}
     */
    var IPvFuture = '((v|V)' + hexDigitOnly +'+\\.[' + unreserved + subDelims + ':]+(' + cidr + ')?)';

    var allTypesRegExp = new RegExp('^(' + IPv4address + or + IPv6address + or + IPvFuture + ')$'),
        IPv4RegExp = new RegExp('^' + IPv4address + '$'),
        IPv6RegExp = new RegExp('^' + IPv6address + '$'),
        IPvFutureRegExp = new RegExp('^' + IPvFuture + '$');

    function testIp(str) {
        return allTypesRegExp.test(str);
    }

    function testV4(str) {
        return IPv4RegExp.test(str);
    }

    function testV6(str) {
        return IPv6RegExp.test(str);
    }

    function testFuture(str) {
        return IPvFutureRegExp.test(str);
    }

    module.exports = {
        test: testIp,
        v4: testV4,
        v6: testV6,
        future: testFuture
    };
}(module));