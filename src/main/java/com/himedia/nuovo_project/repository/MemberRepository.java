package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    List<Member> findByMemNameContaining(String memName); // 이름으로 검색
    List<Member> findByMemIdentifierContaining(String memIdentifier); // 아이디로 검색
    List<Member> findByMemPhoneContaining(String memPhone); // 연락처로 검색
    List<Member> findByMemEmailContaining(String email); // 이메일로 검색

    Member getMemberById(int id);
}
