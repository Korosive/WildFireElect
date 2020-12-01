package com.app.WildFireEnt.model;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID postID;

    @Column(name = "title")
    private String title;

    @Column(name = "post_date")
    private Date postDate;

    @Column(name = "edit_date")
    private Date editDate;

    @Column(name = "post")
    private String post;

    public Post() {
    }

    public Post(UUID postID, String title, Date postDate, Date editDate, String post) {
        this.postID = postID;
        this.title = title;
        this.postDate = postDate;
        this.editDate = editDate;
        this.post = post;
    }

    public Post(String title, UUID userID, Date postDate, Date editDate, String post) {
        this.title = title;
        this.postDate = postDate;
        this.editDate = editDate;
        this.post = post;
    }

    public UUID getPostID() {
        return postID;
    }

    public String getTitle() {
        return title;
    }

    public String getPost() {
        return post;
    }

    public Date getPostDate() {
        return postDate;
    }

    public Date getEditDate() {
        return editDate;
    }

}
