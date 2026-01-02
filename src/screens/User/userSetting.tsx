import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Switch,
    Pressable,
    FlatList,
} from "react-native";
import {
    ArrowLeft,
    Camera,
    Crown,
    Car,
    User,
    MapPin,
    Heart,
    Globe,
    CreditCard,
    Shield,
    HelpCircle,
    FileText,
    LogOut,
} from "lucide-react-native";

export const UserProfileSettings = () => {
    const [autoLocation, setAutoLocation] = useState(true);
    const [pinVerification, setPinVerification] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <ArrowLeft color="#fff" size={22} />
                <Text style={styles.headerTitle}>Profile & Settings</Text>
                <Text style={styles.saveBtn}>Save</Text>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* PROFILE CARD */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: "https://i.pravatar.cc/300" }}
                            style={styles.avatar}
                        />
                        <View style={styles.cameraIcon}>
                            <Camera size={14} color="#fff" />
                        </View>
                    </View>

                    <Text style={styles.name}>Apsar</Text>
                    <Text style={styles.subText}>9999999999</Text>
                    <Text style={styles.subText}>apsar@gmail.com</Text>

                    <View style={styles.statsRow}>
                        <View style={[styles.statBox, { backgroundColor: "#FFB703" }]}>
                            <Crown size={16} color="#fff" />
                            <Text style={styles.statText}>Gold Member</Text>
                        </View>

                        <View style={[styles.statBox, { backgroundColor: "#6C63FF" }]}>
                            <Car size={16} color="#fff" />
                            <Text style={styles.statText}>142 Rides</Text>
                        </View>
                    </View>
                </View>

                {/* ACCOUNT */}
                <Section title="ACCOUNT">
                    <Item icon={<User size={18} color="#6C63FF" />} label="Personal Information" />
                    <Item icon={<MapPin size={18} color="#6C63FF" />} label="Saved Addresses" />
                    <Item icon={<Heart size={18} color="#6C63FF" />} label="Emergency Contact" value="Mom" />
                    <Item icon={<Globe size={18} color="#6C63FF" />} label="Language" value="English (US)" />
                </Section>

                {/* RIDE PREFERENCES */}
                <Section title="RIDE PREFERENCES">
                    <SwitchItem
                        label="Auto-Detect Location"
                        value={autoLocation}
                        onChange={setAutoLocation}
                    />

                    <View style={styles.cabTypeRow}>
                        <CabType title="Sedan" active />
                        <CabType title="Mini" />
                        <CabType title="SUV" />
                    </View>

                    <View style={styles.communicationRow}>
                        <CommBtn label="Call" active />
                        <CommBtn label="Chat Only" />
                        <CommBtn label="No Call" />
                    </View>

                    <SwitchItem label="Accessibility Mode" value={false} />
                </Section>

                {/* PAYMENTS */}
                <Section title="PAYMENTS & WALLET">
                    {/* <View style={styles.walletCard}>
                        <Text style={styles.walletAmount}>$42.50</Text>
                        <Text style={styles.walletSub}>Available to spend</Text>

                        <View style={styles.walletActions}>
                            <ActionBtn title="History" />
                            <ActionBtn title="Rewards" />
                        </View>
                    </View>

                    <Item icon={<CreditCard size={18} color="#6C63FF" />} label="Trust Pay" />
                    <Item icon={<CreditCard size={18} color="#6C63FF" />} label="PhonePe" />
                    <Item icon={<CreditCard size={18} color="#6C63FF" />} label="Google Pay" />
                    <Item icon={<CreditCard size={18} color="#6C63FF" />} label="Paytm" /> */}
                    <Pressable
                        onPress={() => {
                            console.log("Add New Payment Method pressed");
                            // navigation.navigate("AddPayment"); // later
                        }}
                        style={({ pressed }) => [
                            styles.addPaymentBtn,
                            pressed && styles.addPaymentPressed,
                        ]}
                    >
                        <Text style={styles.addPaymentText}>+ Add New Payment Method</Text>
                    </Pressable>

                </Section>

                {/* SAFETY */}
                <Section title="SAFETY & PRIVACY">
                    <SwitchItem label="Share Ride Status" value={false} />
                    <SwitchItem
                        label="Ride PIN Verification"
                        value={pinVerification}
                        onChange={setPinVerification}
                    />
                    <Item
                        icon={<Shield size={18} color="#E63946" />}
                        label="Emergency SOS Setup"
                        danger
                    />
                </Section>

                {/* SUPPORT */}
                <Section title="SUPPORT & LEGAL">
                    <Item icon={<HelpCircle size={18} color="#6C63FF" />} label="Help & Support" />
                    <Item icon={<FileText size={18} color="#6C63FF" />} label="Ride History" />
                    <Item icon={<FileText size={18} color="#6C63FF" />} label="Privacy Policy" />
                </Section>

                {/* APP SETTINGS */}
                <Section title="APP SETTINGS">
                    <SwitchItem
                        label="Dark Mode"
                        value={darkMode}
                        onChange={setDarkMode}
                    />

                    <Item label="Clear Cache" value="128 MB" />

                    <TouchableOpacity style={styles.logoutBtn}>
                        <LogOut size={18} color="#fff" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </Section>
            </ScrollView>
        </View>

    );
}

const Section = ({ title, children }: any) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionCard}>{children}</View>
    </View>
);

const Item = ({ icon, label, value, danger }: any) => (
    <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
            {icon}
            <Text style={[styles.itemText, danger && { color: "#E63946" }]}>
                {label}
            </Text>
        </View>
        {value && <Text style={styles.itemValue}>{value}</Text>}
    </TouchableOpacity>
);

const SwitchItem = ({ label, value, onChange }: any) => (
    <View style={styles.item}>
        <Text style={styles.itemText}>{label}</Text>
        <Switch value={value} onValueChange={onChange || (() => { })} />
    </View>
);

const CabType = ({ title, active }: any) => (
    <View
        style={[
            styles.cabType,
            active && { backgroundColor: "#6C63FF" },
        ]}
    >
        <Text style={{ color: active ? "#fff" : "#555" }}>{title}</Text>
    </View>
);

const CommBtn = ({ label, active }: any) => (
    <View
        style={[
            styles.commBtn,
            active && { backgroundColor: "#2ECC71" },
        ]}
    >
        <Text style={{ color: active ? "#fff" : "#555" }}>{label}</Text>
    </View>
);

const ActionBtn = ({ title }: any) => (
    <TouchableOpacity style={styles.actionBtn}>
        <Text style={{ color: "#fff" }}>{title}</Text>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    header: {
        height: 64,
        backgroundColor: "#6C63FF",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 4, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10,
    },

    headerTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    saveBtn: {
        color: "#fff",
        fontWeight: "600",
    },

    scroll: {
        flex: 1,
    },

    profileCard: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 16,
        alignItems: "center",
        padding: 16,
    },

    avatarWrapper: { position: "relative" },
    avatar: { width: 90, height: 90, borderRadius: 45 },
    cameraIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#6C63FF",
        padding: 6,
        borderRadius: 20,
    },

    name: { fontSize: 18, fontWeight: "700", marginTop: 8 },
    subText: { color: "#777", fontSize: 12 },

    statsRow: {
        flexDirection: "row",
        marginTop: 16,
    },

    statBox: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 6,
    },

    statText: { color: "#fff", fontWeight: "600", marginLeft: 6 },

    section: { marginHorizontal: 16, marginBottom: 16 },
    sectionTitle: {
        fontSize: 12,
        color: "#888",
        marginBottom: 8,
    },
    sectionCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingVertical: 6,
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
    },
    itemLeft: { flexDirection: "row", alignItems: "center" },
    itemText: { fontSize: 14, marginLeft: 10 },
    itemValue: { fontSize: 12, color: "#777" },

    cabTypeRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 12,
    },
    cabType: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#EFEFEF",
    },

    communicationRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 12,
    },
    commBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#EFEFEF",
    },

    addPaymentBtn: {
        backgroundColor: "#6C63FF",
        margin: 12,
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    addPaymentPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },

    addPaymentText: {
        color: "#fff",
        fontWeight: "600",
    },

    walletCard: {
        backgroundColor: "#1F2937",
        borderRadius: 16,
        padding: 16,
        margin: 12,
    },
    walletAmount: { color: "#fff", fontSize: 26, fontWeight: "700" },
    walletSub: { color: "#ccc", fontSize: 12 },
    walletActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },

    actionBtn: {
        backgroundColor: "#374151",
        padding: 10,
        borderRadius: 10,
        width: "48%",
        alignItems: "center",
    },

    logoutBtn: {
        backgroundColor: "#E63946",
        margin: 12,
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    logoutText: { color: "#fff", fontWeight: "600", marginLeft: 8 },

    version: {
        textAlign: "center",
        color: "#888",
        fontSize: 12,
        marginBottom: 16,
    },
});
