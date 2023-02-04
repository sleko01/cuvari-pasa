package Primavara.rest.dto;

import org.springframework.data.util.Pair;

import java.util.List;

public class RatedDogsList {

    List<Long> listId;

    List<Long> listValue;

    public List<Long> getListId() {
        return listId;
    }

    public void setListId(List<Long> listId) {
        this.listId = listId;
    }

    public List<Long> getListValue() {
        return listValue;
    }

    public void setListValue(List<Long> listValue) {
        this.listValue = listValue;
    }

    public Long length() {
        return Long.valueOf(listId.size());
    }
}
