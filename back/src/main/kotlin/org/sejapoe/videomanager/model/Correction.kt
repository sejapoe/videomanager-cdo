package org.sejapoe.videomanager.model

import jakarta.persistence.*

@Entity
@Table(name = "corrections")
class Correction(
    @Column(name = "start_time_code")
    var startTimeCode: Int, // in seconds

    @Column(name = "end_time_code")
    var endTimeCode: Int, // in seconds

    @Column(name = "comment")
    var comment: String,

    @Column(name = "admin_comment")
    var adminComment: String,

    @Column(name = "img_url")
    var imgUrl: String, // or entity of static object

    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    @JoinColumn(name = "request_id")
    var request: Request,

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "corrections_seq")
    @SequenceGenerator(name = "corrections_seq", sequenceName = "corrections_seq", allocationSize = 1)
    var id: Long = -1,
)