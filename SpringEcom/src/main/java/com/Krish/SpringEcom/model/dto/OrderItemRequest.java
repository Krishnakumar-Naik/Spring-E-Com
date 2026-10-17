package com.Krish.SpringEcom.model.dto;

public record OrderItemRequest(

        int productId,
        int quantity
) {
}
