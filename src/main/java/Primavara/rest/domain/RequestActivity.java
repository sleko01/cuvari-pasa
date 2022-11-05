package Primavara.rest.domain;


import javax.persistence.*;

@Entity
public class RequestActivity {
    @Id
    @GeneratedValue
    private Long requestActivityId;

    private Long feedingQuantity;

    @ManyToOne
    @JoinColumn(name="request_guardian_id")
    private RequestGuardian requestGuardian;

    @ManyToOne
    @JoinColumn(name="activity_id")
    private Activity activity;

    public Long getRequestActivityId() {
        return requestActivityId;
    }

    public void setRequestActivityId(Long requestActivityId) {
        this.requestActivityId = requestActivityId;
    }

    public Long getFeedingQuantity() {
        return feedingQuantity;
    }

    public void setFeedingQuantity(Long feedingQuantity) {
        this.feedingQuantity = feedingQuantity;
    }

    public RequestGuardian getRequestGuardian() {
        return requestGuardian;
    }

    public void setRequestGuardian(RequestGuardian requestGuardian) {
        this.requestGuardian = requestGuardian;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }
}
