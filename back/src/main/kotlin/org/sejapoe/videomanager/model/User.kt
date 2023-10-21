package org.sejapoe.videomanager.model

import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails


@Entity
@Table(name = "users")
class User(
    @Column(name = "email")
    var email: String,

    @Column(name = "password")
    private var password: String,

    @Column(name = "full_name")
    var fullName: String,

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    var role: Role,

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_seq")
    @SequenceGenerator(name = "users_seq", sequenceName = "users_seq", allocationSize = 1)
    var id: Long = -1
) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> =
        mutableListOf(SimpleGrantedAuthority(role.name))

    override fun getPassword() = password

    override fun getUsername() = email

    override fun isAccountNonExpired() = true

    override fun isAccountNonLocked() = true

    override fun isCredentialsNonExpired() = true
    override fun isEnabled() = true
}