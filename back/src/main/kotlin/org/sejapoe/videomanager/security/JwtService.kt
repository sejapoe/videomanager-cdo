package org.sejapoe.videomanager.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.util.*

@Service
class JwtService(
    @Value("\${jwt.secret}")
    private var jwtSecret: String,
    @Value("\${jwt.issuer}")
    private var jwtIssuer: String,
) {
    fun extractUsername(token: String): String = extractClaim(token) { it.subject }

    fun <T> extractClaim(
        token: String,
        claimsResolver: (Claims) -> T,
    ) = claimsResolver(extractAllClaims(token))

    fun generateToken(
        extraClaims: Map<String, Any>,
        userDetails: UserDetails,
    ): String =
        Jwts.builder()
            .setClaims(extraClaims.toMutableMap())
            .setSubject(userDetails.username)
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + 10 * 24 * 60 * 60 * 1000)) // 10 days
            .setIssuer(jwtIssuer)
            .signWith(SignatureAlgorithm.HS256, jwtSecret)
            .compact()

    fun generateToken(userDetails: UserDetails) = generateToken(mapOf(), userDetails)

    fun validateToken(
        token: String,
        userDetails: UserDetails,
    ) = extractUsername(token) == userDetails.username && !isTokenExpired(token)

    private fun isTokenExpired(token: String) = extractExpiration(token).before(Date())

    private fun extractExpiration(token: String): Date = extractClaim(token) { it.expiration }

    private fun extractAllClaims(token: String) = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).body
}
