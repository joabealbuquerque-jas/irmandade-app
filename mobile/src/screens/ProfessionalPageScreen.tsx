import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';

interface ProfessionalPage {
  id: number;
  user_id: number;
  business_name: string;
  description?: string;
  logo_url?: string;
  cover_url?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  city?: string;
  state?: string;
  plan: string;
  status: string;
  plan_expires_at?: string;
}

interface ProfessionalPageScreenProps {
  page: ProfessionalPage;
  onEdit: () => void;
  onDelete: () => void;
}

const PLANS: Record<string, string> = {
  basic: 'Básico',
  professional: 'Profissional',
  premium: 'Premium',
};

const ProfessionalPageScreen = ({ page, onEdit, onDelete }: ProfessionalPageScreenProps) => {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    Linking.openURL(`https://wa.me/55${cleanPhone}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.businessName}>{page.business_name}</Text>
        <View style={styles.planBadge}>
          <Text style={styles.planText}>{PLANS[page.plan] || page.plan}</Text>
        </View>
      </View>

      {page.description && (
        <Text style={styles.description}>{page.description}</Text>
      )}

      <View style={styles.info}>
        {page.phone && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Telefone:</Text>
            <Text style={styles.infoValue}>{page.phone}</Text>
          </View>
        )}

        {page.whatsapp && (
          <TouchableOpacity
            style={styles.infoItem}
            onPress={() => openWhatsApp(page.whatsapp!)}
          >
            <Text style={styles.infoLabel}>WhatsApp:</Text>
            <Text style={[styles.infoValue, styles.link]}>{page.whatsapp}</Text>
          </TouchableOpacity>
        )}

        {page.website && (
          <TouchableOpacity
            style={styles.infoItem}
            onPress={() => openLink(`https://${page.website}`)}
          >
            <Text style={styles.infoLabel}>Website:</Text>
            <Text style={[styles.infoValue, styles.link]}>{page.website}</Text>
          </TouchableOpacity>
        )}

        {page.instagram && (
          <TouchableOpacity
            style={styles.infoItem}
            onPress={() => openLink(`https://instagram.com/${page.instagram.replace('@', '')}`)}
          >
            <Text style={styles.infoLabel}>Instagram:</Text>
            <Text style={[styles.infoValue, styles.link]}>{page.instagram}</Text>
          </TouchableOpacity>
        )}

        {page.facebook && (
          <TouchableOpacity
            style={styles.infoItem}
            onPress={() => openLink(`https://facebook.com/${page.facebook}`)}
          >
            <Text style={styles.infoLabel}>Facebook:</Text>
            <Text style={[styles.infoValue, styles.link]}>{page.facebook}</Text>
          </TouchableOpacity>
        )}

        {page.youtube && (
          <TouchableOpacity
            style={styles.infoItem}
            onPress={() => openLink(`https://youtube.com/${page.youtube}`)}
          >
            <Text style={styles.infoLabel}>YouTube:</Text>
            <Text style={[styles.infoValue, styles.link]}>{page.youtube}</Text>
          </TouchableOpacity>
        )}

        {page.city && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Cidade:</Text>
            <Text style={styles.infoValue}>{page.city}, {page.state}</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Text style={styles.buttonText}>Editar Página</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonDanger]}
          onPress={onDelete}
        >
          <Text style={[styles.buttonText, styles.buttonTextDanger]}>
            Deletar Página
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CDD4DC',
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#201E1E',
    marginBottom: 8,
  },
  planBadge: {
    backgroundColor: '#033D60',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  planText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    padding: 24,
    textAlign: 'center',
  },
  info: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginTop: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CDD4DC',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    color: '#201E1E',
    fontWeight: '500',
  },
  link: {
    color: '#033D60',
  },
  actions: {
    padding: 24,
    gap: 12,
  },
  button: {
    height: 48,
    backgroundColor: '#033D60',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDanger: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDanger: {
    color: '#FFFFFF',
  },
});

export default ProfessionalPageScreen;
