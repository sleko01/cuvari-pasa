package Primavara.rest.dto;

public class RatedRequestsDTO {
    Long requestId;

    Long userId;

    Boolean userRated;

    Boolean initiatorRated;

    Long initiatorUserId;

    public RatedRequestsDTO(Long requestId, Long userId, Boolean userRated, Boolean initiatorRated, Long initiatorUserId) {
        this.requestId = requestId;
        this.userId = userId;
        this.userRated = userRated;
        this.initiatorRated = initiatorRated;
        this.initiatorUserId = initiatorUserId;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public Boolean getUserRated() {
        return userRated;
    }

    public void setUserRated(Boolean userRated) {
        this.userRated = userRated;
    }

    public Boolean getInitiatorRated() {
        return initiatorRated;
    }

    public void setInitiatorRated(Boolean initiatorRated) {
        this.initiatorRated = initiatorRated;
    }

    public Long getInitiatorUserId() {
        return initiatorUserId;
    }

    public void setInitiatorUserId(Long initiatorUserId) {
        this.initiatorUserId = initiatorUserId;
    }
}
