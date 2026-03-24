package com.institute.backend.controller;

import com.institute.backend.dto.response.ApiResponse;
import com.institute.backend.entity.Banner;
import com.institute.backend.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
@RequiredArgsConstructor
public class BannerController {

    private final BannerRepository bannerRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Banner>>> getActiveBanners() {
        List<Banner> banners = bannerRepository.findByActiveTrueOrderByDisplayOrderAsc();
        return ResponseEntity.ok(ApiResponse.success("Banners fetched successfully", banners));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Banner>> createBanner(@RequestBody Banner banner) {
        Banner saved = bannerRepository.save(banner);
        return ResponseEntity.ok(ApiResponse.success("Banner created successfully", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Banner>> updateBanner(@PathVariable Long id, @RequestBody Banner banner) {
        Banner existing = bannerRepository.findById(id)
                .orElseThrow(() -> new com.institute.backend.exception.ResourceNotFoundException("Banner not found"));
        existing.setTitle(banner.getTitle());
        existing.setSubtitle(banner.getSubtitle());
        existing.setImageUrl(banner.getImageUrl());
        existing.setLinkUrl(banner.getLinkUrl());
        existing.setActive(banner.isActive());
        existing.setDisplayOrder(banner.getDisplayOrder());
        return ResponseEntity.ok(ApiResponse.success("Banner updated successfully", bannerRepository.save(existing)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBanner(@PathVariable Long id) {
        bannerRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Banner deleted successfully", null));
    }
}
