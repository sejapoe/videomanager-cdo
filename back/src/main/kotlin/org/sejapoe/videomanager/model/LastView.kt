package org.sejapoe.videomanager.model

import jakarta.persistence.*

@Entity
@Table(name = "last_view")
class LastView(
    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.EAGER)
    var user: User,

    @JoinColumn(name = "correction_id")
    @ManyToOne(fetch = FetchType.EAGER)
    var correction: Correction,

    @JoinColumn(name = "last_viewed_comment_id")
    @ManyToOne(fetch = FetchType.EAGER)
    var lastViewedComment: Comment,

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "last_view_id_seq")
    @SequenceGenerator(name = "last_view_id_seq", sequenceName = "last_view_id_seq", allocationSize = 1)
    var id: Long = -1L,
)
