package com.example.worldpinbackend.services;

import com.example.worldpinbackend.models.Pin;
import com.example.worldpinbackend.models.Reply;
import com.example.worldpinbackend.repositories.PinRepository;
import com.example.worldpinbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;



@Service
public class PinService {

    @Autowired
    PinRepository pinRepository;

    @Autowired
    UserRepository userRepository;

    public List<Pin> getAllPins(){
        return pinRepository.findAll();
    }



    public List<Pin> getPinByDate(Date date){
        return pinRepository.findPinByDate(date); // Might need to change " .get(); "?
    }

    public List<Pin> getPinByLocation(String location){
        return pinRepository.findPinByLocation(location); // Might need to change " .get(); "?
    }

    public List<Pin> getPinByUserName(String userName){
        return pinRepository.findPinByUserName(userName); // Might need to change " .get(); "?
    }

    public Pin savePin(Pin pin){
        pinRepository.save(pin);
        return pin;
    }


//    public void deletePin(long id) {pinRepository.deleteById(id);}

    public Reply removePinById(Long id, Pin pins) {
        Optional<Pin> pin = pinRepository.findById(id);
        if (pin.isEmpty()) {
            return new Reply(false, "Pin not found.");
        } else {
            pinRepository.delete(pin.get());
            return new Reply(true, "Pin successfully deleted.");
            //            return pins;
            //            Return List of Pins (forces a refresh?)
        }
    }




}
