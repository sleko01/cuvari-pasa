package Primavara.rest.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
public class Activity {
    @Id
    @GeneratedValue
    private Long activityId;

    @NotNull
    private String activityName;

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }
}
